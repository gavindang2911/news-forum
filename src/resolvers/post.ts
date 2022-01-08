import { PaginatedPosts } from '../types/PaginatedPosts';
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { checkAuth } from '../middleware/checkAuth';
import { CreatePostInput } from '../types/CreatePostInput';
import { PostMutationResponse } from '../types/PostMutationResponse';
import { UpdatePostInput } from '../types/UpdatePostInput';
import { LessThan } from 'typeorm';
import { Context } from '../types/Context';
import { VoteType } from '../types/VoteType';
import { UserInputError } from 'apollo-server-core';
import { Upvote } from '../entities/Upvote';


registerEnumType(VoteType, {
	name: 'VoteType' // this one is mandatory
})
@Resolver((_of) => Post)
export class PostResolver {
  @FieldResolver((_return) => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 60);
  }

  @FieldResolver((_return) => User)
  async user(
    @Root() root: Post
    // @Ctx() { dataLoaders: { userLoader } }: Context
  ) {
    return await User.findOne(root.userId);
    // return await userLoader.load(root.userId)
  }

  @Mutation((_return) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async createPost(
    @Arg('createPostInput') { title, text }: CreatePostInput,
    @Ctx() { req }: Context
  ): Promise<PostMutationResponse> {
    try {
      const newPost = Post.create({
        title,
        text,
        userId: req.session.userId,
      });

      await newPost.save();
      return {
        code: 200,
        success: true,
        message: 'Post created successfully',
        post: newPost,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }

  @Query((_return) => PaginatedPosts, { nullable: true })
  async posts(
    @Arg('limit', (_type) => Int) limit: number,
    @Arg('cursor', { nullable: true }) cursor?: string
  ): Promise<PaginatedPosts | null> {
    try {
      const totalPostCount = await Post.count();
      const realLimit = Math.min(10, limit);

      const findOptions: { [key: string]: any } = {
        order: {
          createdAt: 'DESC',
        },
        take: realLimit,
      };

      let lastPost: Post[] = [];
      if (cursor) {
        findOptions.where = { createdAt: LessThan(cursor) };

        lastPost = await Post.find({ order: { createdAt: 'ASC' }, take: 1 });
      }

      const posts = await Post.find(findOptions);

      return {
        totalCount: totalPostCount,
        cursor: posts[posts.length - 1].createdAt,
        hasMore: cursor
          ? posts[posts.length - 1].createdAt.toString() !==
            lastPost[0].createdAt.toString()
          : posts.length !== totalPostCount,
        paginatedPosts: posts,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Query((_return) => Post, { nullable: true })
  async post(@Arg('id', (_type) => ID) id: number): Promise<Post | undefined> {
    try {
      const post = await Post.findOne(id);
      return post;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  @Mutation((_return) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async updatePost(
    @Arg('updatePostInput') { id, title, text }: UpdatePostInput,
    @Ctx() { req }: Context
  ): Promise<PostMutationResponse> {
    const existingPost = await Post.findOne(id);
    if (!existingPost)
      return {
        code: 400,
        success: false,
        message: 'Post not found',
      };

    if (existingPost.userId !== req.session.userId) {
      return { code: 401, success: false, message: 'Unauthorised' };
    }

    existingPost.title = title;
    existingPost.text = text;

    await existingPost.save();

    return {
      code: 200,
      success: true,
      message: 'Post updated succesfully',
      post: existingPost,
    };
  }

  @Mutation((_return) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async deletePost(
    @Arg('id', (_type) => ID) id: number,
    @Ctx() { req }: Context
  ): Promise<PostMutationResponse> {
    const existingPost = await Post.findOne(id);

    if (!existingPost)
      return {
        code: 400,
        success: false,
        message: 'Post not found',
      };

    if (existingPost.userId !== req.session.userId) {
      return { code: 401, success: false, message: 'Unauthorised' };
    }

    await Post.delete({ id });
    return {
      code: 200,
      success: true,
      message: 'Post deleted succesfully',
    };
  }



  @Mutation(_return => PostMutationResponse)
	@UseMiddleware(checkAuth)
	async vote(
		@Arg('postId', _type => Int) postId: number,
		@Arg('inputVoteValue', _type => VoteType) inputVoteValue: VoteType,
		@Ctx()
		{
			req: {
				session: { userId }
			},
			connection
		}: Context
	): Promise<PostMutationResponse> {
		return await connection.transaction(async transactionEntityManager => {
			// check if post exists
			let post = await transactionEntityManager.findOne(Post, postId)
			if (!post) {
				throw new UserInputError('Post not found')
			}

			// check if user has voted or not
			const existingVote = await transactionEntityManager.findOne(Upvote, {
				postId,
				userId
			})

			if (existingVote && existingVote.value !== inputVoteValue) {
				await transactionEntityManager.save(Upvote, {
					...existingVote,
					value: inputVoteValue
				})

				post = await transactionEntityManager.save(Post, {
					...post,
					points: post.points + 2 * inputVoteValue
				})
			}

			if (!existingVote) {
				const newVote = transactionEntityManager.create(Upvote, {
					userId,
					postId,
					value: inputVoteValue
				})
				await transactionEntityManager.save(newVote)

				post.points = post.points + inputVoteValue
				post = await transactionEntityManager.save(post)
			}

			return {
				code: 200,
				success: true,
				message: 'Post voted',
				post
			}
		})
	}
}

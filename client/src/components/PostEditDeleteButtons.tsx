import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, IconButton } from "@chakra-ui/react"

const PostEditDeleteButtons = () => {
    return (
        <Box>
			{/* <NextLink href={`/post/edit/${postId}`}> */}
				<IconButton icon={<EditIcon />} aria-label='edit' mr={4} />
			{/* </NextLink> */}

			<IconButton
				icon={<DeleteIcon />}
				aria-label='delete'
				colorScheme='red'
				// onClick={onPostDelete.bind(this, postId)}
			/>
		</Box>
    )
}

export default PostEditDeleteButtons

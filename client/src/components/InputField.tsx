import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'

interface InputFieldProps {
    name: string
    label: string
    placeholder: string
}

const InputField = (props: InputFieldProps) => {
    const [field, {error}] = useField(props)

    return (
        <FormControl>
            <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
            <Input {...field} id={field.name} placeholder={props.placeholder}></Input>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}

export default InputField
import { useToast } from "@chakra-ui/react";

export const useResourceCreatedToast = () => {
    const toast = useToast();

    const showResourceCreatedToast = (resource: string) => {
        toast({
            title: `Success`,
            description: `The ${resource} was created successfully!`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return { showResourceCreatedToast };
};

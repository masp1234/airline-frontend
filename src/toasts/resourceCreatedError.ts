import { useToast } from "@chakra-ui/react";

export const useResourceCreatedErrorToast = () => {
    const toast = useToast();

    const showResourceCreatedErrorToast = (resource: string) => {
        toast({
            title: `Error`,
            description: `The ${resource} could not be created right now. Try again later.`,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return { showResourceCreatedErrorToast };
};

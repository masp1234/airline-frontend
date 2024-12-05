import { useToast } from "@chakra-ui/react";

export const useResourceDeletedErrorToast = () => {
    const toast = useToast();

    const showResourceDeletedErrorToast = (resource: string) => {
        toast({
            title: `Error`,
            description: `The ${resource} could not be deleted right now. Try again later.`,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return { showResourceDeletedErrorToast };
};

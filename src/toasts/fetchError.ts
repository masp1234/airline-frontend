import { useToast } from "@chakra-ui/react";

export const useErrorToast = () => {
    const toast = useToast();

    const showErrorToast = (item: string) => {
        toast({
            title: `Problem with ${item}`,
            description: `Encountered a problem while trying to find ${item}. Please try again later.`,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return { showErrorToast };
};

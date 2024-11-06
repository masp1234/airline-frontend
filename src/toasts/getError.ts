import { useToast } from "@chakra-ui/react";

export const useGetErrorToast = () => {
    const toast = useToast();

    const showGetErrorToast = (item: string) => {
        toast({
            title: `Problem with ${item}`,
            description: `Encountered a problem while trying to find ${item}. Please try again later.`,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return { showGetErrorToast };
};

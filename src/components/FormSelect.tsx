import React from "react";
import { 
    Select,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

// Generic type `T` must have `id` and `name` properties. Have to declare a contract for <T>.
interface FormSelectProps<T extends { id: number; name: string }> {
    items: T[];
    label: string;
    value: number | null;
    setter: (value: number) => void;
    marginTop: number;
}

// Have to declare the contract again, to ensure type safety.
const FormSelect = <T extends { id: number; name: string }>
(
    { 
        items,
        label,
        value,
        setter,
        marginTop

     }: FormSelectProps<T>) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setter(Number(event.target.value));
    };

    return (
        <FormControl isRequired mt={marginTop}>
            <FormLabel>{label}</FormLabel>
            <Select placeholder={`Select ${label.toLowerCase()}`} value={value || ""} onChange={handleSelectChange}>
                {items?.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default FormSelect;

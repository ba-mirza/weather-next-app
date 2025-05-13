import Form from "next/form";
import {Input} from "@/components/ui/input";

const SearchForm = ({query}: {query?: string}) => {
    return (
        <Form action={'/'} scroll={false}>
            <Input
                className="w-90"
                name="query"
                defaultValue={query}
                placeholder={'Search'}
            />
        </Form>
    )
}

export default SearchForm;
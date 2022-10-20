import { Formik } from "formik";
import { Button, ButtonLabel, Header, Input, SearchForm } from "./Searchbar.styles";

export default function Searchbar({onSubmit}) {
    return (
        <Header>
            <Formik
                initialValues={{ query: "" }}
                // onSubmit={handleSubmit}
            >
                <SearchForm>
                    <Button type="submit">
                        <ButtonLabel>
                            Search
                        </ButtonLabel>
                    </Button>

                    <Input
                        name="query"
                        class="input"
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </Formik>
        </Header>
    )
}

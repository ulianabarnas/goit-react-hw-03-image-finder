import PropTypes from 'prop-types';
import { ErrorMessage, Formik } from "formik";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button, ButtonLabel, Header, Input, SearchForm } from "./Searchbar.styles";

export default function Searchbar({onSubmit}) {
    const handleSubmit = (values, { resetForm }) => {
        if (values.query.trim() === '') {
            return toast.info('Fill this field.')
        }
        
        onSubmit(values.query.trim());
        resetForm();
    };

    return (
        <Header>
            <Formik
                initialValues={{ query: "" }}
                onSubmit={handleSubmit}
            >
                <SearchForm>
                    <Button type="submit">
                        <ButtonLabel>
                            Search
                        </ButtonLabel>
                    </Button>

                    <Input
                        name="query"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                    <ErrorMessage name="query" />
                </SearchForm>
            </Formik>
        </Header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
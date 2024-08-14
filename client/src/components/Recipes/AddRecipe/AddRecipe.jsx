import { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./AddRecipe.module.css";
import useForm from "../../../hooks/useForm";
import * as recipesService from "../../../services/recipesService"
import { useRecipesContext } from "../../../contexts/recipesContext";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function AddRecipe() {
    const { id } = useAuthContext();
    const { addRecipe } = useRecipesContext();

    const [error, setError] = useState();
    const [createError, setCreateError] = useState({});
    const navigate = useNavigate();

    const onCreateRecipe = async (data) => {
        try {
            const newRecipe = await recipesService.create({
                ...data,
                ownerId: id,
                liked: [],
            });

            addRecipe(data, newRecipe._key.path.segments[1]);
            navigate(`/recipes/${newRecipe._key.path.segments[1]}`);
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 2000);
        }
    };

    const { values, onChange, onSubmit } = useForm(onCreateRecipe, {
        name: "",
        imageUrl: "",
        ingredients: "",
        preparation: "",
    });

    const nameValidator = () => {
        if (values.name.length < 3 || values.name.length > 15) {
            setCreateError((state) => ({
                ...state,
                name: 'Name should be between 3 and 15 chars.'
            }));
        } else {
            if (createError.name) {
                setCreateError((state) => ({ ...state, name: '' }));
            }
        }
    }
    const imageValidator = () => {
        if (!values.imageUrl.includes('www')) {
            setCreateError((state) => ({
                ...state,
                imageUrl: 'Image Url should includes "www".'
            }));
        } else {
            if (createError.imageUrl) {
                setCreateError((state) => ({ ...state, imageUrl: '' }));
            }
        }
    }
    const ingredientsValidator = () => {
        if (values.ingredients.length<10) {
            setCreateError((state) => ({
                ...state,
                ingredients: 'Ingredients should be with more then 10 chars.'
            }));
        } else {
            if (createError.ingredients) {
                setCreateError((state) => ({ ...state, ingredients: '' }));
            }
        }
    }
    const preparationValidator = () => {
        if (values.preparation.length<20) {
            setCreateError((state) => ({
                ...state,
                preparation: 'Please tell us more about preparation process.'
            }));
        } else {
            if (createError.preparation) {
                setCreateError((state) => ({ ...state, preparation: '' }));
            }
        }
    }

    return (
        <>
            <header className={style.headerRecipe}>
                <div className={`${style.recipe} ${style.page}`}>
                    <form onSubmit={onSubmit} className={`${style.recipe} ${style.form}`}>
                        <h3>ADD RECIPE</h3>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={onChange}
                            onBlur={nameValidator}
                            placeholder="recipe name"
                        />
                        {createError.name && (
                            <p className={style.errorMessage}>{createError.name}</p>
                        )}

                        <input
                            type="text"
                            name="imageUrl"
                            value={values.imageUrl}
                            onChange={onChange}
                            onBlur={imageValidator}
                            placeholder="www.somephoto.com"
                        />
                        {createError.imageUrl && (
                            <p className={style.errorMessage}>{createError.imageUrl}</p>
                        )}

                        <input
                            type="text"
                            name="ingredients"
                            value={values.ingredients}
                            onChange={onChange}
                            onBlur={ingredientsValidator}
                            placeholder="ingredients separated with comma"
                        />
                        {createError.ingredients && (
                            <p className={style.errorMessage}>{createError.ingredients}</p>
                        )}
                        
                        <textarea
                            rows="4"
                            cols="34"
                            type="text"
                            name="preparation"
                            value={values.preparation}
                            onChange={onChange}
                            onBlur={preparationValidator}
                            placeholder="preparation"
                        />
                        {createError.preparation && (<p className={style.errorMessage}>{createError.preparation}</p>)}
                        
                        {error && <p className={style.errorMessage}>{error}</p>}
                        <button disabled={Object.values(createError).some((x) => x !== "")}>Add</button>
                        
                    </form>
                </div>
            </header>
        </>
    );
}

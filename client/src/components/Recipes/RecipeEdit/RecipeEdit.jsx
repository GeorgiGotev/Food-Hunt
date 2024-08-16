import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecipesContext } from "../../../contexts/recipesContext";

import style from "./RecipeEdit.module.css";
import useForm from "../../../hooks/useForm";
import * as recipesService from "../../../services/recipesService";

export default function RecipeEdit() {
    const navigate = useNavigate();
    const { editRecipe } = useRecipesContext();
    const { recipeId } = useParams();

    const [error, setError] = useState();
    const [editError, setEditError] = useState({});

    const onEditRecipe = async (editedData, recipeId) => {
        try {
            await recipesService.editRecipe(recipeId, editedData);
            editRecipe(recipeId, editedData)
            navigate(`/recipes/${recipeId}`);
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 2000);
        }
    };


    const { values, onChange, onSubmit, onChangeValues } = useForm(onEditRecipe, {
        name: "",
        imageUrl: "",
        ingredients: "",
        preparation: "",
    }, recipeId);

    useEffect(() => {
        recipesService.getOne(recipeId).then((result) => {
            onChangeValues(result);
        });
    }, [recipeId]);


    const nameValidator = () => {
        if (values.name.length < 3 || values.name.length > 25) {
            setEditError((state) => ({
                ...state,
                name: 'Name should be between 3 and 25 chars.'
            }));
        } else {
            if (editError.name) {
                setEditError((state) => ({ ...state, name: '' }));
            }
        }
    }
    const imageValidator = () => {
        if (!values.imageUrl.includes('www')) {
            setEditError((state) => ({
                ...state,
                imageUrl: 'Image Url should includes "www".'
            }));
        } else {
            if (editError.imageUrl) {
                setEditError((state) => ({ ...state, imageUrl: '' }));
            }
        }
    }
    const ingredientsValidator = () => {
        if (values.ingredients.length<10) {
            setEditError((state) => ({
                ...state,
                ingredients: 'Ingredients should be with more then 10 chars.'
            }));
        } else {
            if (editError.ingredients) {
                setEditError((state) => ({ ...state, ingredients: '' }));
            }
        }
    }
    const preparationValidator = () => {
        if (values.preparation.length<20) {
            setEditError((state) => ({
                ...state,
                preparation: 'Please tell us more about preparation process.'
            }));
        } else {
            if (editError.preparation) {
                setEditError((state) => ({ ...state, preparation: '' }));
            }
        }
    }



    return (
        <>
            <header className={style.headerRecipe}>
                <div className={`${style.recipe} ${style.page}`}>
                    <form onSubmit={onSubmit} className={`${style.recipe} ${style.form}`}>
                        <h3>EDIT RECIPE</h3>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={onChange}
                            onBlur={nameValidator}
                            placeholder="recipe name"
                        />
                        {editError.name && (
                            <p className={style.errorMessage}>{editError.name}</p>
                        )}

                        <input
                            type="text"
                            name="imageUrl"
                            value={values.imageUrl}
                            onChange={onChange}
                            onBlur={imageValidator}
                            placeholder="www.somephoto.com"
                        />
                        {editError.imageUrl && (
                            <p className={style.errorMessage}>{editError.imageUrl}</p>
                        )}

                        <input
                            type="text"
                            name="ingredients"
                            value={values.ingredients}
                            onChange={onChange}
                            onBlur={ingredientsValidator}
                            placeholder="ingredients separated with comma"
                        />
                        {editError.ingredients && (
                            <p className={style.errorMessage}>{editError.ingredients}</p>
                        )}
                        <textarea
                            rows="4"
                            cols="36"
                            type="text"
                            name="preparation"
                            value={values.preparation}
                            onChange={onChange}
                            onBlur={preparationValidator}
                            placeholder="preparation"
                        />
                        {editError.preparation && (
                            <p className={style.errorMessage}>{editError.preparation}</p>
                        )}
                        {error && <p className={style.errorMessage}>{error}</p>}
                        <button disabled={Object.values(editError).some((x) => x !== "")}>Save</button>
                    </form>
                </div>
            </header>
        </>
    );
}

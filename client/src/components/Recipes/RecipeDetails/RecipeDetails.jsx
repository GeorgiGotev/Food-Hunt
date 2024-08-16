import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import styles from "./RecipeDetails.module.css";
import Spinner from "../../Spinner";
import * as recipeService from "../../../services/recipesService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useRecipesContext } from "../../../contexts/recipesContext";

export default function RecipeDetails() {
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const { user, isAuthenticated } = useAuthContext();
    const { deleteRecipe, selectedRecipe, likeRecipe, unlikeRecipe } = useRecipesContext();

    const currentRecipe = selectedRecipe(recipeId);

    const [recipe, setRecipe] = useState(false);
    const [likesCounter, setLikesCounter] = useState(currentRecipe.data?.liked.length)
    
  


    const isOwner = currentRecipe.data?.ownerId === user.uid;
    const liked = currentRecipe.data?.liked.includes(user.uid)
    //generate shopping list from ingredients if own or liked recipe button show
    useEffect(() => {
        try {
            recipeService.getOne(recipeId).then((result) => {
                setRecipe(result);
            });
        } catch (err) {
            console.log(err);
        }

    }, [recipeId]);



    const onLikeHandler = async () => {
        try {
            await recipeService.onLike(recipeId, recipe.liked, user.uid);
            await setLikesCounter(likesCounter=>likesCounter+1);
            likeRecipe(recipeId, user.uid)
        } catch (err) {
            console.log(err);
        }
    };

    const onUnlikeHandler = async () => {
        try {
            await recipeService.onUnlike(recipeId, recipe.liked, user.uid);
            await setLikesCounter(likesCounter=>likesCounter-1);
            unlikeRecipe(recipeId, recipe.liked, user.uid)
        } catch (err) {
            console.log(err);
        }
    }

    const onDeleteHandler = async () => {
        try {
            const result = confirm(`Are you sure you want to delete ${currentRecipe.name}`);

            if (result) {
                await recipeService.deleteRecipe(recipeId);
                deleteRecipe(recipeId)
                navigate('/profile')
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <section className={styles.detailsContainer}>
            <div className="col-md-4">
                {!recipe ? (
                    <Spinner />
                ) : (
                    <>
                        <h1 className={`pt20 pb20 ${styles.recipeName}`}>{recipe.name} Recipe</h1>

                        <div className="card bg-transparent border my-3 my-md-0">
                            <img
                                src={recipe.imageUrl}
                                alt={recipe.name}
                                className="rounded-0 card-img-top mg-responsive"
                            />
                            <div className="card-body">
                                {/* <h4 className={`pt20 pb20 ${styles.recipeName}`}>{recipe.name}</h4> */}
                                <p className={styles.ulText}>Ingredients: </p>
                                <ul className={styles.ingredientsList}>
                                    {recipe.ingredients.split(',').map(x => <li key={Math.floor((Math.random() * 100) + 1)}> - {x}</li>)}
                                </ul>



                                <p className={styles.ulText}>Preparation:</p>
                                <ul className={styles.ingredientsList}>

                                    {recipe.preparation.split('\n').map(x => <li key={Math.floor((Math.random() * 100) + 1)}>{x}</li>)}

                                </ul>

                                {isAuthenticated && (
                                    <h2 className="text-center mb-4">
                                        {isOwner && (
                                            <>
                                                <Link
                                                    className={`badge badge-primary ${styles.btnDetails}`}
                                                    to={`/recipes/${recipeId}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    onClick={onDeleteHandler}
                                                    className={`badge badge-primary ${styles.btnDetails}`}
                                                >
                                                    Delete
                                                </Link>
                                            </>
                                        )}
                                        {!isOwner && !liked && (
                                            <Link
                                                onClick={onLikeHandler}
                                                className={`badge badge-primary ${styles.btnDetails}`}
                                            // to={`/recipes/${recipeId}`}
                                            >
                                                Like
                                            </Link>
                                        )}
                                        {!isOwner && liked && (
                                            <>
                                                {/* <p>This recipe is in your favorite list!</p> */}
                                                <Link
                                                    onClick={onUnlikeHandler}
                                                    className={`badge badge-primary ${styles.btnDetails}`}
                                                //make it to profile/favorite
                                                // to={`/profile`}
                                                >
                                                    Unlike
                                                </Link>

                                            </>
                                        )}    
                                    </h2>
                                )}
                            </div>
                        
                            <h3 className="likes-s"> ❤️ {likesCounter}</h3>
                    
                        </div>

                    </>
                )}
            </div>
        </section>
    );
}



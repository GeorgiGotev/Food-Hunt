import styles from '../Profile/Profile.module.css';
import { useAuthContext } from '../../contexts/AuthContext';
import { useRecipesContext } from '../../contexts/recipesContext';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeItem from '../Recipes/RecipeItem/RecipeItem';
import Spinner from '../Spinner';
import * as recipesService from '../../services/recipesService';
import { useAuth, upload } from '../../lib/firebase';

export default function Profile() {

    const currentUser = useAuth()

    const { user, id } = useAuthContext();
    const { likedRecipes, ownRecipes, isLoading } = useRecipesContext();

    const [profileRecipes, setProfileRecipes] = useState(likedRecipes(id));

    const [photo, setPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('imgs/images.png');
    const [loading, setLoading] = useState(false);


    function changeHandler(e) {
        if (e.target.files[0]) {
            const currFile = e.target.files[0];
            const blob = URL.createObjectURL(currFile)

            setPhoto(currFile);
            setPhotoUrl(blob);
        }

    }

    function clickHandler() {
        upload(photo, currentUser, setLoading);
        setPhoto('')
    }

    useEffect(() => {
        try {
            if (!currentUser?.photoUrl) {
                setPhotoUrl(currentUser.photoURL)
            }
            recipesService.getLikedByUser(id)
                .then(res => setProfileRecipes(res))
        } catch (err) {
            console.log(err);
        }
    }, [currentUser])
    const ownRecipesShow = () => {
        setProfileRecipes(ownRecipes(id))
    }
    const favoriteRecipesShow = () => {
        setProfileRecipes(likedRecipes(id))
    }
    console.log(photo);


    return (
        <>
            {/* sidebar? */}
            {/* <div className={styles.sidebare}>
                <Link
                    className={`badge badge-primary ${styles.btnDetails} ${styles.sideBarBtn}`}
                    href="#" >OWN RECIPES</Link>
                <Link
                    className={`badge badge-primary ${styles.btnDetails} ${styles.sideBarBtn}`}

                    href="#" >FAVORITE</Link>
                <Link
                    className={`badge badge-primary ${styles.btnDetails} ${styles.sideBarBtn}`}
                    href="#" >Link 3</Link>
            </div> */}

            <div className={styles.contentDiv}>
                <div className={styles.card}>
                    <div className={styles.container}>

                        <label>
                            <form>
                                <div className="avatar">
                                    <div className="avatar-container avatar-size">
                                        <img src={photoUrl} alt='avatar' className="avatar-image" />
                                        <div className='edit-container'>
                                            <div>📷</div>
                                            <input className='file-input' type="file" onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                {photo && (<div className="row justify-content-center avatar-upload">
                                    <div className="col-sm-7 col-md-4 mb-5">
                                        <ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item">
                                                <a onClick={clickHandler} className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#foods" role="tab" aria-controls="pills-home" aria-selected="true"
                                                >Upload</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>)}
                            </form>
                        </label>

                        <h3>User details:</h3>
                        <h4>
                            <p>{`name: ${user.displayName}`}</p>
                            <p>{`e-mail: ${user.email}`}</p>
                        </h4>
                    </div>

                </div>

                <div className={styles.gallery1}>
                    <h2 className={`${styles.space}`}>RECIPES</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-7 col-md-4 mb-5">
                        <ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a onClick={favoriteRecipesShow} className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#foods" role="tab" aria-controls="pills-home" aria-selected="true"
                                >Favorite</a>
                            </li>
                            <li className="nav-item">
                                <a onClick={ownRecipesShow} className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#juices" role="tab" aria-controls="pills-profile" aria-selected="false"
                                >Own Recipes</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="gallary row">
                    {isLoading && <Spinner />}
                    {profileRecipes && profileRecipes.map((x) => (
                        <RecipeItem key={x.data?.id} {...x} />
                    ))}
                </div>
                {!isLoading && profileRecipes.length === 0 && (
                    <div className={styles.customHeading1}>
                        <h2>No recipes yet</h2>
                    </div>
                )}
            </div>
        </>
    );
}

import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteUserProductById, getUserProductById } from "../../services/storeProductsService";
import "./UserProductDetails.css";

const UserProductDetails = () => {

    const [productInfo, setProductInfo] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const result = await getUserProductById(id)
            setProductInfo(result);
            console.log(result)
            console.log(user);
        }
        )()
    }, [])

    const onProductDelete = async(e) => {
        e.preventDefault();
        await deleteUserProductById(id);
        navigate('/recycle');
    }
    

    return (
        <section className="details-wrapper">
            <div className="details-container">
                <div className="details-product-wrapper">
                    <div className="details-product-container">
                        <div className="details-product-top">
                            <img src = {productInfo.imgUrl}></img>
                        </div>

                        <div className="details-product-bottom">
                            <div className="details-product-left">
                                <div className="details-product-details">
                                    <p>Category :{productInfo.category}</p>
                                    <p>Model: {productInfo.model}</p>
                                    <p>Collection year : {productInfo.year}</p>
                                    <p>{productInfo.description}</p>
                                    <p>Material: {productInfo.material}</p>

                                    {user._id && user._id !==productInfo._ownerId  && <NavLink className="sell-btn" to="/">Add to cart</NavLink>}
                                    
                                    {user._id === productInfo._ownerId && <>
                                        <NavLink className="sell-btn" to={`/recycle/${id}/edit`}>Edit</NavLink>
                                        <NavLink className="sell-btn" onClick= {onProductDelete}>Delete</NavLink>
                                        </>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default UserProductDetails;


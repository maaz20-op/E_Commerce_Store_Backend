import { asyncHandler, errorResponseApi, successResponseApi } from '@maaz-jutt-utils/my-utils';
import { ProductModel } from '../../models/productModel.js';
import {ReviewModel} from '../../models/reviewModel.js';
import { UserModel } from '../../models/UserModel.js';


export const createProduct = asyncHandler(async (req, res) => {
    const { productName, productDescription, price, stock, category } = req.body;

    if(!productName || !price || !stock || !productDescription || !category) {
        return errorResponseApi(res, 400, "Missing Some Fields");
    }

    const parseStock = JSON.parse(stock);
    const parsePrice = JSON.parse(price);
 
    // Collect uploaded images
    const imagesMediaUrl = [];
    ["img1", "img2", "img3"].forEach((fieldName) => {
        if(req.files && req.files[fieldName]) {
            imagesMediaUrl.push(req.files[fieldName][0].path);
        }
    });



    const product = await ProductModel.create({
        productName,
         category,
        productDescription,
        price: parsePrice,
        stock: parseStock,
        images: imagesMediaUrl
    });


    if(product) successResponseApi(res, 201, "Product created", product);
    else errorResponseApi(res, 501, "Failed to create product");
});

// GET /api/products?page=1&limit=6
export const getProducts = asyncHandler(async (req, res) => {
  // Query params with defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  // Total count for frontend info
  const totalProducts = await ProductModel.countDocuments();

  // Fetch paginated products
  const products = await ProductModel.find().skip(skip).limit(limit);

  if (products.length > 0) {
    successResponseApi(res, 200, "Products fetched successfully", {
      products,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts
    });
  } else {
    errorResponseApi(res, 404, "No products found");
  }
});



export const getProductByID =  asyncHandler( async (req, res) => {
 const id = req.params.id;
 if(!id) errorResponseApi(res, 404, "Id is in valid")
  const product = await ProductModel.findById(id)
  .populate({
    path: "reviews",
    populate: {
      path: "userId",
      model: "User",
      select: "name email profilePic"
    }
  });

 if(product) successResponseApi(res, 201, "Product receviced", product)
   else errorResponseApi(res, 404, "Id is in valid")
});

 //check this 
export const createReview = asyncHandler(async (req, res) => {
  const { review, rating, productId } = req.body;
  const loggedInUserId = req.user?.id;

  if (!rating || !productId || !loggedInUserId) {
    return errorResponseApi(res, 404, "Review Data is missing");
  }

  // 🔥 Find User
  const user = await UserModel.findOne({ userAuthId: loggedInUserId });
  if (!user) return errorResponseApi(res, 404, "User not found");

  const { profilePic } = user;

  // 🔥 Find Product
  const product = await ProductModel.findById(productId);
  if (!product) return errorResponseApi(res, 404, "Product not found");


  // 🔥 Create Review
  const createdReview = await ReviewModel.create({
    reviewText: review,
    rating,
    userId: user._id,
    productId,
    profilePic,
  });

  // 🔥 Push review into product
  product.reviews.push(createdReview._id);
  await product.save();
const finalReview = await ReviewModel.findById(createdReview._id).populate("userId").select("-password");
  return successResponseApi(res, 201, "Review Added Successfully", finalReview);
});


export const deleteProduct =  asyncHandler( async (req, res) => {
  const {id} = req.body;
if(!id) return errorResponseApi(res, 450, "invalid crediantials");
const product = await ProductModel.deleteOne({_id: id});
if(!product) return errorResponseApi(res, 450, "product of this id is not exists");
const reviews = await ReviewModel.deleteMany({productId:id});
successResponseApi(res, 200, "product deleted successfully!", id);
});



export const sendCartProductInArray =  asyncHandler( async (req, res) => {
 const {idArray} = req.body.data;
 if(!idArray || !Array.isArray(idArray)) return errorResponseApi(res, 443, "Invalid data, not array")
const products = await ProductModel.find({
  _id: { $in: idArray }
});
successResponseApi(res, 200, "fetched cart products", products)
});




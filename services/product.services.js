const ProductRepository = require("../repositories/product.repositories");
const LikeRepository = require("../repositories/like.repositories");
const CommentRepository = require("../repositories/comment.repositories");

class ProductService {
  productRepository = new ProductRepository();
  likeRepository = new LikeRepository();
  commentRepository = new CommentRepository();

  // prodcut 전체 조회  api
  findAllproducts = async (userId) => {
    let likeChack;
    const allProducts = await this.productRepository.findAllproducts();
    const productIdata = JSON.parse(await this.likeRepository.findProductId());

    for(let i = 0; i < productIdata.length; i++){
      let userIdCopy = productIdata[i].userId.find(userId);;
      if(!userIdCopy){
        likeChack = false;
      }else{
        likeChack = true;
      }
    };
    // const likedProduct = await this.productRepository.findlikedProducts(userId)

    return allProducts.map((product) => {
      // const likeCount = await this.likeRepository.findLikeCount(product.productId);
      // const commentCount = await this.commentRepository.commentCount(product.productId);
      // const checklikedProducts = await likedProduct.findOne({ where: { productId:product.productId } });
      // if (!checklikedProducts.length) {
      //    liked = false;
      // } else {
      //    liked = true;
      // };
      return {
        product: {
          productId: product.productId,
          title: product.title,
          category: product.category,
          location: product.location,
          price: product.price,
          img: product.img,
          content: product.content,
          commentCount: product.commentCount,
          createdAt: product.createdAt,
        },
        like: {
          like: likeChack,
          likeCount: product.Likes.likeCount,
        },
      };
    });
  };
  
  //카테고리 prodcut api
  findCategoryrproducts = async (category, userId) => {
    const categoryProducts = await this.productRepository.findCategoryrproducts(
      category
    );
    const productIdata = await this.likeRepository.findProductId(userId);

    return categoryProducts.map((product) => {
      // const likeCount = await this.likeRepository.findLikeCount(product.productId);
      // const commentCount = await this.commentRepository.commentCount(product.productId);
      // const checklikedProducts = await likedProduct.findOne({ where: { productId:product.productId } });
      // if (!checklikedProducts.length) {
      //    liked = false;
      // } else {
      //    liked = true;
      // };
      return {
        product: {
          productId: product.productId,
          title: product.title,
          category: product.category,
          location: product.location,
          price: product.price,
          img: product.img,
          content: product.content,
          commentCount: product.commentCount,
          createdAt: product.createdAt,
        },
        like: {
          like: productIdata.includes(product.productId),
          likeCount: product.Likes.likeCount,
        },
      };
    });
  };

  //상세 prodcut api
  findTargetproduct = async (productId, userId) => {
    const targetProducts = await this.productRepository.targetProduct(
      productId
    );
    const productIdata = await this.likeRepository.findProductId();

    return targetProducts.map((product) => {
      // const likeCount = await this.likeRepository.findLikeCount(product.productId);
      // const commentsData = await this.commentRepository.comments(product.productId);
      // const checklikedProducts = await likedProduct.findOne({ where: { productId:product.productId } });
      // if (!checklikedProducts.length) {
      //    liked = false;
      // } else {
      //    liked = true;
      // };
      return {
        product: {
          productId: product.productId,
          title: product.title,
          category: product.category,
          location: product.location,
          price: product.price,
          img: product.img,
          content: product.content,
          content: product.content,
          createdAt: product.createdAt,
          nickname: product.nickname,
        },
        like: {
          like: productIdata.includes(product.productId),
          likeCount: product.Likes.likeCount,
        },
      };
    });
  };

  createProduct = async (
    nickname,
    title,
    category,
    location,
    price,
    content,
    img
  ) => {
    const createProductData = await this.productRepository.createProduct(
      nickname,
      title,
      category,
      location,
      price,
      content,
      img
    );

    return {
      nickname: createProductData.nickname,
      title: createProductData.title,
      category: createProductData.category,
      location: createProductData.location,
      price: createProductData.price,
      content: createProductData.content,
      img: createProductData.img,
    };
  };

  updateProduct = async (
    productId,
    title,
    category,
    location,
    price,
    content,
    img
  ) => {
    await this.productRepository.updateProduct(
      productId,
      title,
      category,
      location,
      price,
      content,
      img
    );

    const updateProduct = await this.productRepository.findProductOne(
      productId
    );

    return {
      productId: updateProduct.productId,
      title: updateProduct.title,
      category: updateProduct.category,
      location: updateProduct.location,
      price: updateProduct.price,
      content: updateProduct.content,
      img: updateProduct.img,
      createdAt: updateProduct.createdAt,
    };
  };

  deleteProduct = async (productId) => {
    const findProduct = await this.productRepository.findProductOne(productId);

    if (!findProduct) throw new Error("댓글이 존재하지 않습니다.");

    await this.productRepository.deleteProduct(productId);

    return {
      productId: findProduct.productId,
      title: findProduct.title,
      category: findProduct.category,
      location: findProduct.location,
      price: findProduct.price,
      img: findProduct.img,
      content: findProduct.content,
      createdAt: findProduct.createdAt,
    };
  };
}

module.exports = ProductService;

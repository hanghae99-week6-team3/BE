const ProductRepository = require("../repositories/product.repositories");
const LikeRepository = require("../repositories/like.repository");
const CommentRepository = require("../repositories/comment.repositories");

class ProductService {
  productRepository = new ProductRepository();
  likeRepository = new LikeRepository();
  commentRepository = new CommentRepository();


  // prodcut 전체 조회  api
  findAllproducts = async (userId) => {
    const allProducts = await this.productRepository.findAllproducts();
    const likedProduct = await this.productRepository.findlikedProducts(userId)
    
    return allProducts.map((product) => {
      const likeCount = await this.likeRepository.findLikeCount(product.productId);
      const commentCount = await this.commentRepository.commentCount(product.productId);
      const checklikedProducts = await likedProduct.findOne({ where: { productId:product.productId } });
      if (!checklikedProducts.length) {
         liked = false;
      } else {
         liked = true;
      };
      return {
        product: {
          productId:product.productId,
          title: product.title,
          category: product.category,
          location: product.location,
          price: product.price,
          commentCount:commentCount,
          createdAt: product.createdAt,
        },
        like:{
          like: liked,
          likeCount:likeCount,
        }
      };
    });
  };
  //카테고리 prodcut api
  findCategoryrproducts = async (category, userId)=>{
    const categoryProducts = await this.productRepository.findCategoryrproducts(category);
    const likedProduct = await this.productRepository.findlikedProducts(userId)
    
    return categoryProducts.map((product) => {
      const likeCount = await this.likeRepository.findLikeCount(product.productId);
      const commentCount = await this.commentRepository.commentCount(product.productId);
      const checklikedProducts = await likedProduct.findOne({ where: { productId:product.productId } });
      if (!checklikedProducts.length) {
         liked = false;
      } else {
         liked = true;
      };
      return {
        product: {
          productId:product.productId,
          title: product.title,
          category: product.category,
          location: product.location,
          price: product.price,
          commentCount:commentCount,
          createdAt: product.createdAt,
        },
        like:{
          like:liked,
          likeCount:likeCount,
        },
      };
    });
  };

  //상세 prodcut api
  findTargetproduct = async (productId, userId)=>{
    const targetProducts = await this.productRepository.targetProduct(productId);
    const likedProduct = await this.productRepository.findlikedProducts(userId)

    return targetProducts.map((product) => {
      const likeCount = await this.likeRepository.findLikeCount(product.productId);
      const commentsData = await this.commentRepository.comments(product.productId);
      const checklikedProducts = await likedProduct.findOne({ where: { productId:product.productId } });
      if (!checklikedProducts.length) {
         liked = false;
      } else {
         liked = true;
      };
      return {
        product: {
          productId:product.productId,
          title: product.title,
          category: product.category,
          location: product.location,
          price: product.price,
          content: product.content,
          createdAt: product.createdAt,
          nickname: product.nickname,
        },
        like:{
          like: liked,
          likeCount:likeCount,
        },
        comment:[
          commentsData
        ]
        ,
      };
    });
  }

  createProduct = async (
    nickname,
    title,
    category,
    location,
    price,
    content
  ) => {
    const createProductData = await this.productRepository.createProduct(
      nickname,
      title,
      category,
      location,
      price,
      content
    );

    return {
      nickname: createProductData.nickname,
      title: createProductData.title,
      category: createProductData.category,
      location: createProductData.location,
      price: createProductData.price,
      content: createProductData.content,
    };
  };

  updateProduct = async (
    productId,
    title,
    category,
    location,
    price,
    content
  ) => {
    await this.productRepository.updateProduct(
      productId,
      title,
      category,
      location,
      price,
      content
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
      content: findProduct.content,
      createdAt: findProduct.createdAt,
    };
  };
}

module.exports = ProductService;

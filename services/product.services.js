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
    const productIdata = JSON.parse(await this.likeRepository.findProductId(userId));

    for(let i = 0; i < productIdata.length; i++){
      const userIdCopy = JSON(productIdata[i].userId).find(userId);;
      if(!userIdCopy){
        likeChack = false;
      }else{
        likeChack = true;
      }
    };

    return allProducts.map((product) => {
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

  //비회원 전체 조회 api
  findAllproducts_none = async () => {
    let likeChack = false;
    const allProducts = await this.productRepository.findAllproducts();

    return allProducts.map((product) => {
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
    let likeChack;
    const categoryProducts = await this.productRepository.findCategoryrproducts(category);
    const productIdata = JSON.parse(await this.likeRepository.findProductId());

    for(let i = 0; i < productIdata.length; i++){
      const userIdCopy = JSON(productIdata[i].userId).find(userId);;
      if(!userIdCopy){
        likeChack = false;
      }else{
        likeChack = true;
      }
    };

    return categoryProducts.map((product) => {
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

  //비회원 카테고리 prodcut api
  findCategoryrproducts_none = async (category) => {
    let likeChack = false;
    const categoryProducts = await this.productRepository.findCategoryrproducts(category);

    return categoryProducts.map((product) => {
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

  //상세 prodcut api
  findTargetproduct = async (productId, userId) => {
    let likeChack;
    const targetProducts = await this.productRepository.targetProduct(productId);
    const productIdata = JSON.parse(await this.likeRepository.findProductId());

    for(let i = 0; i < productIdata.length; i++){
      const userIdCopy = JSON(productIdata[i].userId).find(userId);;
      if(!userIdCopy){
        likeChack = false;
      }else{
        likeChack = true;
      }
    };

    return targetProducts.map((product) => {
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
          like: likeChack,
          likeCount: product.Likes.likeCount,
        },
      };
    });
  };

  //비회원 상세 prodcut api
  findTargetproduct = async (productId) => {
    let likeChack = false;
    const targetProducts = await this.productRepository.targetProduct(productId);

    return targetProducts.map((product) => {
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
          like: likeChack,
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

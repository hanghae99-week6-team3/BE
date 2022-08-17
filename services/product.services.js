const ProductRepository = require("../repositories/product.repositories");
// const LikeRepository = require("../repositories/like.repositories");
const CommentRepository = require("../repositories/comment.repositories");

class ProductService {
  productRepository = new ProductRepository();
  // likeRepository = new LikeRepository();
  commentRepository = new CommentRepository();

  // prodcut 전체 조회  api
  findAllproducts = async () => {
    // let likeChack;
    const allProducts = await this.productRepository.findAllproducts();
    console.log(allProducts);
    // const productIdata = JSON.parse(await this.likeRepository.findProductId(userId));

    // for(let i = 0; i < productIdata.length; i++){
    //   const userIdCopy = JSON(productIdata[i].userId).find(userId);;
    //   if(!userIdCopy){
    //     likeChack = false;
    //   }else{
    //     likeChack = true;
    //   }
    // };

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
          commentCount: product.Comments.length,
          createdAt: product.createdAt,
        },
        // like: {
        //   like: likeChack,
        //   likeCount: product.Likes.likeCount,
        // },
      };
    });
  };

  //비회원 전체 조회 api
  findAllproducts_none = async () => {
    // let likeChack = false;
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
          commentCount: product.Comments.length,
          createdAt: product.createdAt,
        },
      };
    });
  };

  //카테고리 prodcut api
  findCategoryrproducts = async (category, userId) => {
    // let likeChack;
    const categoryProducts = await this.productRepository.findCategoryrproducts(
      category
    );
    console.log(category);
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
          commentCount: product.Comments.length,
          createdAt: product.createdAt,
        },
      };
    });
  };

  //비회원 카테고리 prodcut api
  findCategoryrproducts_none = async (category) => {
    // let likeChack = false;
    const categoryProducts = await this.productRepository.findCategoryrproducts(
      category
    );
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
          commentCount: product.Comments.length,
          createdAt: product.createdAt,
        },
      };
    });
  };

  //상세 prodcut api
  findTargetproduct = async (productId) => {
    const targetProducts = await this.productRepository.targetProduct(
      productId
    );
    return targetProducts;
    // return targetProducts.map((product) => {
    //   return {
    //     product: {
    //       productId: product.productId,
    //       title: product.title,
    //       category: product.category,
    //       location: product.location,
    //       price: product.price,
    //       img: product.img,
    //       content: product.content,
    //       content: product.content,
    //       createdAt: product.createdAt,
    //       nickname: product.nickname,
    //     },
    // };
  };

  //비회원 상세 prodcut api
  findTargetproduct_none = async (productId) => {
    // let likeChack = false;
    const targetProducts = await this.productRepository.targetProduct(
      productId
    );
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
      };
    });
  };

  //상품 설명 생성
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
      productId: createProductData.productId,
      nickname: createProductData.nickname,
      title: createProductData.title,
      category: createProductData.category,
      location: createProductData.location,
      price: createProductData.price,
      content: createProductData.content,
      img: createProductData.img,
      createdAt: createProductData.createdAt,
      updatedAt: createProductData.updatedAt,
    };
  };
  //상품 설명 수정
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
  //상품 설명 삭제
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

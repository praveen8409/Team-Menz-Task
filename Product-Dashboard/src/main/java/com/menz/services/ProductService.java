package com.menz.services;

import com.menz.dtos.PageableResponse;
import com.menz.dtos.ProductDto;

import java.util.List;

public interface ProductService {

    ProductDto create(ProductDto productDto);

    ProductDto update(ProductDto productDto, String productId);

    void delete(String productId);

    ProductDto get(String productId);

    List<ProductDto> getAllProducts();

    PageableResponse<ProductDto> getAll(int pageNumber, int pageSize, String sortBy, String sortDir);

    PageableResponse<ProductDto> searchByTitle(String subTitle, int pageNumber, int pageSize, String sortBy, String sortDir);

    PageableResponse<ProductDto> searchByProductNumberOrTitle(String query, int pageNumber, int pageSize, String sortBy, String sortDir);

}

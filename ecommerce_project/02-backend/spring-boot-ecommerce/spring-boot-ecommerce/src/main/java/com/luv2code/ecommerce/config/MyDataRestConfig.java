package com.luv2code.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

@Configuration 
public class MyDataRestConfig implements RepositoryRestConfigurer{

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		
		HttpMethod[] theUnsupportedActions = {HttpMethod.DELETE, HttpMethod.PUT, HttpMethod.POST};
		
		//disable http methods for Product: put, post, delete
		config.getExposureConfiguration()
		.forDomainType(Product.class)
		.withItemExposure((metData, httpMethods) -> httpMethods.disable(theUnsupportedActions))
		.withCollectionExposure((metData, httpMethods) -> httpMethods.disable(theUnsupportedActions));
		
		//disable http methods for ProductCategory: put, post, delete
				config.getExposureConfiguration()
				.forDomainType(ProductCategory.class)
				.withItemExposure((metData, httpMethods) -> httpMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metData, httpMethods) -> httpMethods.disable(theUnsupportedActions));
		
	}

	
}

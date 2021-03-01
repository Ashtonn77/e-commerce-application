package com.luv2code.ecommerce.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

@Configuration 
public class MyDataRestConfig implements RepositoryRestConfigurer{

	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager)
	{
		entityManager = theEntityManager;
	};

	@Autowired


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


		//  call internal helper to help expose ids
		exposeIds(config);
	}

	private void exposeIds(RepositoryRestConfiguration config) {

		// get list of all entity classes from entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

		// create array of entity types
		List<Class> entityClasses = new ArrayList<>();

		for(EntityType tmpEntityType : entities)
		{
			entityClasses.add(tmpEntityType.getJavaType());
		}

		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);

	}

	
}

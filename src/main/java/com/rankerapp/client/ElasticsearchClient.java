package com.rankerapp.client;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component
public class ElasticsearchClient {

    private final RestHighLevelClient client;

    @Inject
    public ElasticsearchClient(RestHighLevelClient client) {
        this.client = client;
    }

    public void test() {
        
        // TODO (jshimizu): implement method to index list, also a guide on creating index mappings locally

        // https://www.elastic.co/guide/en/elasticsearch/client/java-rest/master/java-rest-high-search.html
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchAllQuery());
        searchRequest.source(searchSourceBuilder);

        try {
            SearchResponse resp  = client.search(searchRequest);
            // Show that the query worked
            System.out.println(resp.toString());
        } catch (Exception ex) {
            // Log the exception
            System.out.println(ex.toString());
        }
    }
}

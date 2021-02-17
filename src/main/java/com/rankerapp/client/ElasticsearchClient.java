package com.rankerapp.client;

import com.rankerapp.db.model.ListEntity;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static com.rankerapp.config.ElasticsearchConfig.LIST_INDEX;

@Singleton
public class ElasticsearchClient {

    private static final Logger LOG = LoggerFactory.getLogger(ElasticsearchClient.class);

    private static final String LIST_ID_FIELD = "listId";

    private static final String LIST_TITLE_FIELD = "listTitle";

    private final RestHighLevelClient client;

    @Inject
    public ElasticsearchClient(RestHighLevelClient client) {
        this.client = client;
    }

    public void indexList(ListEntity listEntity) throws IOException {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put(LIST_ID_FIELD, listEntity.getId().toString());
        jsonMap.put(LIST_TITLE_FIELD, listEntity.getTitle());

        IndexRequest indexRequest = new IndexRequest(LIST_INDEX).source(jsonMap);

        client.index(indexRequest, RequestOptions.DEFAULT);
    }

    public List<UUID> searchForList(String searchQuery) {

        // https://www.elastic.co/guide/en/elasticsearch/client/java-rest/master/java-rest-high-search.html
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchQuery(LIST_TITLE_FIELD, searchQuery));
        searchRequest.source(searchSourceBuilder);

        try {
            SearchResponse resp  = client.search(searchRequest, RequestOptions.DEFAULT);

            return Arrays.stream(resp.getHits().getHits())
                    .map((hit) -> (String) hit.getSourceAsMap().get(LIST_ID_FIELD))
                    .map(UUID::fromString)
                    .collect(Collectors.toList());
        } catch (IOException ex) {
            LOG.error("Unable to read from elastic!", ex);
            return Collections.emptyList();
        }
    }
}

query($identifier_1: String!) {
    cmsPage(identifier: $identifier_1) {
        title,
        content,
        page_width,
        content_heading,
        meta_title,
        meta_description,
        meta_keywords
    }
}

---------------------------------------

query {
    cmsPage(identifier: "privacy-policy") {
        title,
        content,
        page_width,
        content_heading,
        meta_title,
        meta_description,
        meta_keywords
    }
}
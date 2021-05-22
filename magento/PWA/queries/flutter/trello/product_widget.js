query {
    products(
		filter: {
			conditions: {
				eq: "XltgMWA6XltgdHlwZWA6YE1hZ2VudG98fENhdGFsb2dXaWRnZXR8fE1vZGVsfHxSdWxlfHxDb25kaXRpb258fENvbWJpbmVgLGBhZ2dyZWdhdG9yYDpgYWxsYCxgdmFsdWVgOmAxYCxgbmV3X2NoaWxkYDpgYF5dLGAxLS0xYDpeW2B0eXBlYDpgTWFnZW50b3x8Q2F0YWxvZ1dpZGdldHx8TW9kZWx8fFJ1bGV8fENvbmRpdGlvbnx8UHJvZHVjdGAsYGF0dHJpYnV0ZWA6YGNhdGVnb3J5X2lkc2AsYG9wZXJhdG9yYDpgPT1gLGB2YWx1ZWA6YDM1YF5dXl0="
			},
			customer_group_id: {
				eq: 1
			}
		}, 
		pageSize: 20, 
		currentPage: 1
		) {
        total_count,
        items {
            id,
            sku,
            name,
            type_id,
            stock_status,
            price_range {
                minimum_price {
                    discount {
                        amount_off,
                        percent_off
                    },
                    final_price {
                        currency,
                        value
                    },
                    regular_price {
                        currency,
                        value
                    }
                }
            },
            thumbnail {
                path,
                url
            },
            small_image {
                path,
                url
            },
            short_description {
                html
            },
            special_from_date,
            special_to_date,
            price_tiers {
                discount {
                    amount_off,
                    percent_off
                },
                final_price {
                    currency,
                    value
                },
                quantity
            },
            attributes: s_attributes {
                attribute_id,
                attribute_value,
                attribute_code,
                attribute_type,
                attribute_label,
                attribute_options {
                    label,
                    value,
                    swatch_data {
                        type,
                        value
                    }
                }
            },
            url,
            review_count,
            rating_summary,
            ...on ConfigurableProduct {
                configurable_options {
                    attribute_code,
                    values {
                        value_index
                    }
                },
                variants {
                    product {
                        id,
                        sku,
                        name,
                        type_id,
                        stock_status,
                        price_range {
                            minimum_price {
                                discount {
                                    amount_off,
                                    percent_off
                                },
                                final_price {
                                    currency,
                                    value
                                },
                                regular_price {
                                    currency,
                                    value
                                }
                            }
                        },
                        thumbnail {
                            path,
                            url
                        },
                        small_image {
                            path,
                            url
                        },
                        short_description {
                            html
                        },
                        special_from_date,
                        special_to_date,
                        price_tiers {
                            discount {
                                amount_off,
                                percent_off
                            },
                            final_price {
                                currency,
                                value
                            },
                            quantity
                        },
                        attributes: s_attributes {
                            attribute_id,
                            attribute_value,
                            attribute_code,
                            attribute_type,
                            attribute_label
                        }
                    }
                }
            },
            ...on BundleProduct {
                price_view,
                dynamic_price,
                dynamic_sku,
                ship_bundle_items,
                dynamic_weight,
                items {
                    option_id,
                    title,
                    required,
                    type,
                    position,
                    sku,
                    options {
                        id,
                        label,
                        quantity,
                        position,
                        is_default,
                        price,
                        price_type,
                        can_change_quantity,
                        product {
                            id,
                            sku,
                            name,
                            type_id,
                            stock_status,
                            price_range {
                                minimum_price {
                                    discount {
                                        amount_off,
                                        percent_off
                                    },
                                    final_price {
                                        currency,
                                        value
                                    },
                                    regular_price {
                                        currency,
                                        value
                                    }
                                }
                            },
                            thumbnail {
                                path,
                                url
                            },
                            small_image {
                                path,
                                url
                            },
                            short_description {
                                html
                            },
                            special_from_date,
                            special_to_date,
                            price_tiers {
                                discount {
                                    amount_off,
                                    percent_off
                                },
                                final_price {
                                    currency,
                                    value
                                },
                                quantity
                            },
                            attributes: s_attributes {
                                attribute_id,
                                attribute_value,
                                attribute_code,
                                attribute_type,
                                attribute_label
                            }
                        }
                    }
                }
            }
        },
        page_info {
            current_page,
            total_pages
        }
    }
}

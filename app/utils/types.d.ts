/* eslint-disable @typescript-eslint/no-explicit-any */
export type ZoraProfile = {
    address: string;
    wallets: string[];
    addressShort: string;
    avatar: string;
    username: string;
    displayName: string | null;
    ensName: string;
    handle: string;
    profileId: string;
    profileName: string;
    ensRecords: {
        address: string;
        ens_name: string;
        text_records: {
            avatar: string;
            url: string;
            description: string | null;
            github: string;
            twitter: string;
            instagram: string | null;
            discord: string | null;
            tiktok: string | null;
        };
    };
    description: string;
    totalFollowers: number;
    totalFollowing: number;
    extension: {
        theme: {
            color: {
                background: string;
                text: string;
                accent: string;
                accentText: string;
                border: string;
            };
            font: {
                heading: {
                    fontFamily: string;
                    fontSize: string;
                    lineHeight: string;
                };
                body: {
                    fontFamily: string;
                    fontSize: string;
                    lineHeight: string;
                };
                caption: {
                    fontFamily: string;
                    fontSize: string;
                    lineHeight: string;
                };
            };
            button: {
                shape: string;
            };
            unit: {
                radius: string;
                base: string;
            };
        };
        links: {
            twitter: string;
            instagram: string | null;
            farcaster: string | null;
            tiktok: string | null;
            discord: string | null;
            website: string;
        };
        options: {
            showMetadataHistories: boolean;
            useBorders: boolean;
            textTransform: {
                heading: string;
                body: string;
                caption: string;
            };
            backgroundImage: {
                image: string | null;
                title: string | null;
                blur: number;
                opacity: number;
                size: number;
                repeat: boolean;
                style: string;
            };
            dropShadow: {
                spreadRadius: number;
                blurRadius: number;
                color: string;
                opacity: number;
            };
            textStyling: {
                styleType: string;
                horizontalLength: number;
                verticalLength: number;
                blurRadius: number;
                color: string;
                opacity: number;
            };
            useMusic: boolean;
            musicUrl: string | null;
        };
        profile: {
            displayOptions: {
                initialView: string | null;
            };
        };
        template: string;
    };
    extensionUrl: string;
};

export type ZoraFeedResponse = {
    data: ZoraFeedItem[];
    limit: number;
    has_more: boolean;
    cursor: {
        first: string;
        last: string;
    };
};

export type ZoraFeedItem = {
    feed_item_type: string;
    uuid: string;
    feed_item: {
        chain_name: string;
        mintable_type: string;
        token_standard: string;
        contract_address: string;
        creator_address: string;
        token_creator: string;
        collection: {
            address: string;
            name: string;
            symbol: string;
            token_standard: string;
            description: string;
            image: string;
        };
        token_id: string;
        token_name: string;
        mint_context: {
            mint_context_type: string;
            renderer_contract: string | null;
            permissions: ZoraPermission[];
            sale_strategies: ZoraSaleStrategy[];
        };
        royalties: ZoraRoyalty[];
        contract_version: string;
        created_at_block: number;
        uri: string;
        b2r_redeemable: string | null;
        mint_fee_per_token: string;
    };
    is_active: boolean;
    cost: ZoraCost;
    total_mint_volume: ZoraVolume;
    total_supply: number | null;
    total_minted: number;
    wallet_max: number | null;
    start_datetime: string | null;
    end_datetime: string | null;
    collector_summary: {
        num_unique_collectors: number;
        collector_previews: ZoraCollectorPreview[];
    };
    metadata: ZoraMetadata;
    status: string | null;
    uuid: string;
    on_chain_token_id: string | null;
    premint_token_id: string | null;
    media: ZoraMedia;
    creator_profile: ZoraProfile;
    mint_comments_preview_and_total: {
        mint_comments: ZoraMintComment[];
        total: number;
    };
    content_moderation_status: string | null;
    content_moderation_take_down_category: string | null;
    activity_context: string | null;
    user_mint_count: number;
};

export type ZoraPermission = {
    user: string;
    token_id: number;
    is_admin: boolean;
    is_minter: boolean;
    is_sales_manager: boolean;
    is_metadata_manager: boolean;
    is_funds_manager: boolean;
};

export type ZoraSaleStrategy = {
    sale_strategies_type: string;
    fixed_price: ZoraSaleDetail;
    presale: ZoraSaleDetail;
    redeem_minter: boolean;
    erc20_minter: ZoraSaleDetail;
    zora_timed_minter: ZoraTimedMinter;
};

export type ZoraSaleDetail = {
    token_id: string | null;
    sale_start: string | null;
    sale_end: string | null;
    max_tokens_per_address: string | null;
    price_per_token: string | null;
    funds_recipient: string | null;
    merkle_root?: string | null;
    currency?: string | null;
};

export type ZoraTimedMinter = {
    token_id: number;
    sale_start: string;
    sale_end: string;
    mint_fee: string;
    secondary_activated: boolean;
    erc_20_z: {
        erc20_address: string;
        name: string;
        symbol: string;
        uni_v3_pool: string;
    };
};

export type ZoraRoyalty = {
    token_id: number;
    user: string;
    royalty_bps: string;
    royaltyRecipient: string;
    royalty_mint_schedule: number;
};

export type ZoraCost = {
    native_price: ZoraPrice;
    block_number: number;
    eth_price: ZoraPrice;
    usdc_price: string | null;
};

export type ZoraPrice = {
    currency: {
        name: string;
        address: string;
        decimals: number;
    };
    raw: string;
    decimal: number;
};

export type ZoraVolume = {
    native_price: ZoraPrice;
    block_number: number;
    eth_price: ZoraPrice;
    usdc_price: string | null;
};

export type ZoraCollectorPreview = {
    address: string;
    ens_name: string | null;
};

export type ZoraMetadata = {
    name: string;
    description: string;
    attributes: any[];
    uri: string;
    raw: {
        content: {
            mime: string;
            uri: string;
        };
        description: string;
        image: string;
        name: string;
    };
};

export type ZoraMedia = {
    image_preview: ZoraMediaDetail;
    image_carousel: ZoraMediaDetail[];
    content_preview: ZoraMediaDetail | null;
    content_carousel: ZoraMediaDetail[] | null;
    mime_type: string;
    image_dimensions: string | null;
    fallback_raw_uri: string;
};

export type ZoraMediaDetail = {
    raw: string;
    mime_type: string;
    encoded_large: string;
    encoded_preview: string;
    encoded_thumbnail: string;
};

export type ZoraProfile = {
    address: string;
    username: string;
    display_name: string;
    ens_name: string | null;
    avatar: string;
    current_user_hide_setting: string | null;
    following_status: string;
};

export type ZoraMintComment = {
    chain_name: string;
    collection_address: string;
    token_id: string;
    token_standard: string | null;
    comment: string;
    from_address: string;
    is_blocked: boolean;
    minter: {
        address: string;
        username: string;
        display_name: string | null;
        ens_name: string | null;
        avatar: string | null;
        current_user_hide_setting: string | null;
        following_status: string;
    };
    quantity: number;
    transaction_info: {
        block_number: number;
        block_timestamp: string;
        transaction_hash: string;
    };
};

export interface ZoraProfileTokensResponse {
    result: {
        data: {
            json: {
                data: ZoraTokenData[];
                limit: number;
                hasMore: boolean;
                cursor: {
                    first: string;
                    last: string;
                };
            };
        };
    };
}

export interface ZoraTokenData {
    standard: string;  
    mintableType: string;  
    collection: {
        chainName: string; 
        name: string;  
        address: string;  
        image: string;  
        resizedImage: string;  
    };
    token: {
        tokenId: string; 
        creator: string;  
        name: string;  
        totalMinted: number | null;  
        isStarted: boolean;  
        image: {
            url: string | null;  
            mimeType: string;  
            resizedImage: string | null; 
        };
        media: {
            url: string | null;  
            mimeType: string | null;  
    };
  }
}

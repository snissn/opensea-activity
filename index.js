const fetch = require('node-fetch');
function log(x){
    console.log(JSON.stringify(x, null, 4));
}
let data = {}
function sortObjectEntries(obj, n){

let sortedList = []
//Sorting by values asc
sortedList = Object.entries(obj).sort((a,b)=>{
      if(b[1] > a[1]) return 1;
      else if(b[1] < a[1]) return -1;
//if values are same do edition checking if keys are in the right order
      else {
         if(a[0] > b[0]) return 1;
         else if(a[0] < b[0]) return -1;
         else return 0
  }
 })
 // return first n values from sortedList
  const mylist= sortedList.map(el=>el[0]).slice(0,n)
  const ret = {}
  for(var i = 0; i < mylist.length; i++){
      ret[mylist[i]] = obj[mylist[i]];
  }
    return ret
 }
fetch("https://api.opensea.io/graphql/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
  },
  "referrer": "https://opensea.io/",
  "referrerPolicy": "strict-origin",
  "body": "{\"id\":\"EventHistoryQuery\",\"query\":\"query EventHistoryQuery(\\n  $archetype: ArchetypeInputType\\n  $bundle: BundleSlug\\n  $collections: [CollectionSlug!]\\n  $categories: [CollectionSlug!]\\n  $chains: [ChainScalar!]\\n  $eventTypes: [EventType!]\\n  $cursor: String\\n  $count: Int = 10\\n  $showAll: Boolean = false\\n  $identity: IdentityInputType\\n) {\\n  ...EventHistory_data_L1XK6\\n}\\n\\nfragment AccountLink_data on AccountType {\\n  address\\n  user {\\n    publicUsername\\n    id\\n  }\\n  ...ProfileImage_data\\n  ...wallet_accountKey\\n  ...accounts_url\\n}\\n\\nfragment AssetCell_asset on AssetType {\\n  collection {\\n    name\\n    id\\n  }\\n  name\\n  ...AssetMedia_asset\\n  ...asset_url\\n}\\n\\nfragment AssetCell_assetBundle on AssetBundleType {\\n  assetQuantities(first: 2) {\\n    edges {\\n      node {\\n        asset {\\n          collection {\\n            name\\n            id\\n          }\\n          name\\n          ...AssetMedia_asset\\n          ...asset_url\\n          id\\n        }\\n        relayId\\n        id\\n      }\\n    }\\n  }\\n  name\\n  slug\\n}\\n\\nfragment AssetMedia_asset on AssetType {\\n  animationUrl\\n  backgroundColor\\n  collection {\\n    description\\n    displayData {\\n      cardDisplayStyle\\n    }\\n    imageUrl\\n    hidden\\n    name\\n    slug\\n    id\\n  }\\n  description\\n  name\\n  tokenId\\n  imageUrl\\n  isDelisted\\n}\\n\\nfragment AssetQuantity_data on AssetQuantityType {\\n  asset {\\n    ...Price_data\\n    id\\n  }\\n  quantity\\n}\\n\\nfragment EventHistory_data_L1XK6 on Query {\\n  assetEvents(after: $cursor, bundle: $bundle, archetype: $archetype, first: $count, categories: $categories, collections: $collections, chains: $chains, eventTypes: $eventTypes, identity: $identity, includeHidden: true) {\\n    edges {\\n      node {\\n        assetBundle @include(if: $showAll) {\\n          ...AssetCell_assetBundle\\n          id\\n        }\\n        assetQuantity {\\n          asset @include(if: $showAll) {\\n            ...AssetCell_asset\\n            id\\n          }\\n          ...quantity_data\\n          id\\n        }\\n        relayId\\n        eventTimestamp\\n        eventType\\n        offerEnteredClosedAt\\n        customEventName\\n        devFee {\\n          asset {\\n            assetContract {\\n              chain\\n              id\\n            }\\n            id\\n          }\\n          quantity\\n          ...AssetQuantity_data\\n          id\\n        }\\n        devFeePaymentEvent {\\n          ...EventTimestamp_data\\n          id\\n        }\\n        fromAccount {\\n          address\\n          ...AccountLink_data\\n          id\\n        }\\n        price {\\n          quantity\\n          ...AssetQuantity_data\\n          id\\n        }\\n        endingPrice {\\n          quantity\\n          ...AssetQuantity_data\\n          id\\n        }\\n        seller {\\n          ...AccountLink_data\\n          id\\n        }\\n        toAccount {\\n          ...AccountLink_data\\n          id\\n        }\\n        winnerAccount {\\n          ...AccountLink_data\\n          id\\n        }\\n        ...EventTimestamp_data\\n        id\\n        __typename\\n      }\\n      cursor\\n    }\\n    pageInfo {\\n      endCursor\\n      hasNextPage\\n    }\\n  }\\n}\\n\\nfragment EventTimestamp_data on AssetEventType {\\n  eventTimestamp\\n  transaction {\\n    blockExplorerLink\\n    id\\n  }\\n}\\n\\nfragment Price_data on AssetType {\\n  decimals\\n  imageUrl\\n  symbol\\n  usdSpotPrice\\n  assetContract {\\n    blockExplorerLink\\n    chain\\n    id\\n  }\\n}\\n\\nfragment ProfileImage_data on AccountType {\\n  imageUrl\\n  address\\n  chain {\\n    identifier\\n    id\\n  }\\n}\\n\\nfragment accounts_url on AccountType {\\n  address\\n  user {\\n    publicUsername\\n    id\\n  }\\n}\\n\\nfragment asset_url on AssetType {\\n  assetContract {\\n    account {\\n      address\\n      chain {\\n        identifier\\n        id\\n      }\\n      id\\n    }\\n    id\\n  }\\n  tokenId\\n}\\n\\nfragment quantity_data on AssetQuantityType {\\n  asset {\\n    decimals\\n    id\\n  }\\n  quantity\\n}\\n\\nfragment wallet_accountKey on AccountType {\\n  address\\n  chain {\\n    identifier\\n    id\\n  }\\n}\\n\",\"variables\":{\"archetype\":null,\"bundle\":null,\"collections\":[],\"categories\":null,\"chains\":null,\"eventTypes\":[\"AUCTION_SUCCESSFUL\"],\"cursor\":null,\"count\":100,\"showAll\":true,\"identity\":null}}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}).then(res => res.json())
.then(json => {
    //console.log(JSON.stringify(json.data.assetEvents.edges, null, 4));
    json.data.assetEvents.edges.forEach( x=>{
        const asset =     x.node.assetQuantity.asset.collection.name
        data[asset] = 1 +( data[asset] || 0)
    });
    log(sortObjectEntries(data,10))


});



const { DataFetcher, DataFetcherProxy } = require("./pattern");



const fetcher = new DataFetcher();
const fetcherProxy = new DataFetcherProxy(fetcher);

const fetch = async () => {
  // const info1 = await fetcher.getData('pikachu')
  // const info2 = await fetcher.getData('pikachu')
  // const info3 = await fetcher.getData('pikachu')

  const info1 = await fetcherProxy.getData('pikachu')
  const info2 = await fetcherProxy.getData('pikachu')
  const info3 = await fetcherProxy.getData('pikachu')

  //console.log(info1, info2)
}

fetch();

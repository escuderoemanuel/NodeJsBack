class DataFetcher {
  async getData(pokemonName) {
    console.log('calling service')
    const result = (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)).json()
    return result;
  }
}

class DataFetcherProxy {

  constructor(fetcher) {
    this.fetcher = fetcher;
    this.cache = {}
  }

  async getData(pokemonName) {
    if (this.cache[pokemonName]) {
      return this.cache[pokemonName];
    }

    const data = this.fetcher.getData(pokemonName)
    this.cache[pokemonName] = data;
    return data;
  }
}


module.exports = {
  DataFetcher,
  DataFetcherProxy
}; 
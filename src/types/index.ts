export type Character =
    {
        url: string
        name: string
        gender: string
        culture: string
        born: string
        died: string
        titles: Array<string>
        aliases: Array<string>
        father: string
        mother: string
        spouse: string
        allegiances: Array<string>
        books: Array<string>
        povBooks: Array<string>
        tvSeries: Array<string>
        playedBy: Array<string>
    };

export type House = {
    url: string
    name: string
    region: string
    coatOfArms: string
    words: string
    titles: Array<string>
    seats: Array<string>
    currentLord: string
    heir: string
    overlord: string
    founded: string
    founder: string
    diedOut: string
    ancestralWeapons: Array<string>
    cadetBranches: Array<string>
    swornMembers: Array<string>

}
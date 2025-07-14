export default class Project {
    name: string
    description: string
    imgUrl: string
    urlName: string

    constructor({name, description, imgUrl, urlName} : {name: string, description: string, imgUrl: string, urlName: string}) {
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.urlName = urlName;
    }
}
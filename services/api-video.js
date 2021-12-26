import hyRequest from "./index";
export function getTopMv(offset,limit=10){
    return hyRequest.get("/top/mv",{ offset,limit})
}
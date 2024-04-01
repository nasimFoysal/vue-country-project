const getStoredData = (name) => {
    const storedData = localStorage.getItem(name);
    if (storedData) {
        return JSON.parse(storedData);
    }
    return [];
};
// -------------
const saveCountryIdsToLocalStorage = (type, countryId) =>{
    const savedCountryIds = getStoredData(type);
    const doesIdAlreadyExist = savedCountryIds.find(id => id ===countryId );
    if(!doesIdAlreadyExist){
        savedCountryIds.push(countryId);
        localStorage.setItem(type, JSON.stringify(savedCountryIds));

    }
    return doesIdAlreadyExist

}



// ---------------
const saveCommentsToLocalStorage = (obj) => {
    const allStoredComments = getStoredData("allComments");
    console.log(allStoredComments);
    if (allStoredComments.length>0) {
        console.log('inside');
        const hasCommentedBefore = allStoredComments.findIndex(
            (storedComment) => storedComment.countryCode === obj.countryCode
        );
        //     country code ache
        if (hasCommentedBefore !== -1) {
            console.log(allStoredComments[hasCommentedBefore].comments);
            allStoredComments[hasCommentedBefore].comments.push(obj.commentDetails);
            return;
        } else {
            //     country code nai
            allStoredComments.push({countryCode : obj.countryCode, comments : [{...obj.commentDetails}]});
            return;
        }
    } else {
        allStoredComments.push({countryCode : obj.countryCode, comments : [{...obj.commentDetails}]});
    }

    localStorage.setItem("allComments", JSON.stringify(allStoredComments));
    console.log(allStoredComments);
};
export {getStoredData, saveCommentsToLocalStorage, saveCountryIdsToLocalStorage}
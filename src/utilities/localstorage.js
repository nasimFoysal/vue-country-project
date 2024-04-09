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
    // console.log(allStoredComments);

    if (allStoredComments.length>0) {
        // console.log('inside');
        const hasCommentedBefore = allStoredComments.find(
            (storedComment) => storedComment.countryCode === obj.countryCode
        );
        //     country code ache
        if (hasCommentedBefore) {
            hasCommentedBefore.comments.push({...obj.commentDetails});
            const idx = allStoredComments.findIndex(c => c.countryCode ===    obj.countryCode);
            allStoredComments.splice(idx, 1, hasCommentedBefore);
        } else {
            //     country code nai
            allStoredComments.push({countryCode : obj.countryCode, comments : [{...obj.commentDetails}]});
        }
    } else {
        allStoredComments.push({countryCode : obj.countryCode, comments : [{...obj.commentDetails}]});

    }

    localStorage.setItem("allComments", JSON.stringify(allStoredComments));
};
export {getStoredData, saveCommentsToLocalStorage, saveCountryIdsToLocalStorage}
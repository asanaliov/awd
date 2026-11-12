function createTagCollector(formatFn){
    const tags = new Map()
    function add(tag, value){
        if (!tags.has(tag)){
            tags.set(tag, [])
        }
        tags.get(tag).push(value)
    }
    function clearTag(tag){
        tags.delete(tag);
    }
    function report(tag){
        let r;
        if(tags.has(tag)){
            r = formatFn(tag, tags.get(tag));
        }else{
            r = null;
        }
        return r
    }
    function reportAll(){
        const results = []
        for (const tag of tags.keys()){
            results.push(formatFn(tag, tags.get(tag)))
        }
        return results.sort()

    }
    return {
        add, clearTag, report, reportAll
    }
}

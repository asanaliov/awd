function createTagCollector(formatFn){
    const tags = new Map()
    function add(tag, value){
        if (!tags.has(tag)){
            tags.set(tag, [])
        }
        tags.get(tag).push(value)
    }
    function clearTag(tag){
        if (tags.has(tag))
            tags.delete(tag);
    }

    function report(tag){
        let r = null;
        if (tags.has(tag)){
            r = formatFn(tag, tags.get(tag))
        }
        return r;
    }
    function reportAll(){
        return Array.from(tags.keys()).sort().map(tag => formatFn(tag, tags.get(tag)))
    }
    return {
        add, clearTag, report, reportAll
    }
}

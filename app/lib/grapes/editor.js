import grapesjs from 'grapesjs';
// import basicBlocks from 'grapesjs-blocks-basic';
// import imageEditor from 'grapesjs-tui-image-editor';
// import flexBox from 'grapesjs-blocks-flexbox';
// import styleGradient from 'grapesjs-style-gradient';
// import styleBackground from 'grapesjs-style-bg';


const initEditor = () => {
    
    let editor = grapesjs.init({
        showOffsets: 1,
        container: '#gjs',
        // plugins: [basicBlocks, imageEditor],
        height: '650px',
        fromElement: true,
        dragMode: 'translate',
        storageManager: { autoload: 0 },
        
        assetManager: {
            assets: [
                "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            ],
            upload:"https://upload.imagedelivery.net/EDVNKiokZY00Hmb9DW-U4w/7f711acf-623b-42f0-df55-e81a09166201",
            uploadName: "file",
            credentials:'omit',
            multiUpload:false,
            customFetch: (url, options) => fetch(url, options) //required to return the response in the shape the asset manager is expecting
                .then((response) => {
                    if(response.ok){
                        return response.json()
                    } else {
                        if(response.status == 409){
                            return new Error("Upload URL expired. Please refresh page and try again.")
                        }
                        return response.json().then((data) => new Error(data))
                    }
                }).then((data) => {
                    console.log('resopnse data: ', data)
                    return {
                        data: [
                            data.result.variants[0]
                        ]
                    }
                }).catch((err) => {
                    console.log("Err: ",err)
                })
        },
        
        //apparently this allows styles to be applied only to the specific comonent (i.e. prevents other components with the same classname from being styled)
        //Try using IDs first before activating this
        selectorManager: {
            componentFirst: true
        },
        // pluginsOpts: {
        //     [basicBlocks]: {
        //         blocks: ['column1', 'column2', 'column3-7', 'text', 'link', 'image'],
        //         flexGrid: 1,
        //     },
        //     [imageEditor]: {
        //         labelImageEditor: "Edit your Image"
        //     }
        // },
    
    });
    window.editor = editor;

    editor.Components.addType('basic-wrapper', {
        model: {
            default: {
                content: `<section id='hero' className="flex relative min-h-12rem md:min-h-25rem">
                </section>`
            }
        }
    })

    let square = editor.BlockManager.add('basic-wrapper', {
        content:{type: 'basic-wrapper'},
        label:"Basic Wrapper"
    })

    let spinBlock = editor.BlockManager.add('id-spin', {
    content:{ type: 'spin-block', animated:true},
    label: "Spin"
    })

    let appearBlock = editor.BlockManager.add('id-appear', {
    content:{ type: 'appear-block', animated:true},
    label: "Appear"
    })


    //animated
    editor.Components.addType('appear-block', appearBlock)
    editor.Components.addType('spin-block', spinBlock)

    //layout & static
    editor.Components.addType('square', square)
    
    // Set drag mode on the canvas so the component drops properly where we expect it right away
    editor.on('block:drag:start', (block) => {
        if(block && block.attributes.content.animated){
            editor.setDragMode('absolute');
        }
    })
    //permanently set 'absolute' drag mode at the component level on the newly dropped animated component
    editor.on(`block:drag:stop`, (component, block) => {

        // if component exists, means the drop was successful
        if (component && component.attributes.animated) {
            editor.setDragMode("translate")
            var res = component.setDragMode('absolute');
            
            // component.getChildAt(1)?.setDragMode('absolute'); //animation shadow if it exists

        
        }
    })
 
    return editor
}

export default initEditor

import React from 'react'
// import { Loader } from 'semantic-ui-react'

export const LoadingPage = () => <div style={{ width: "100%", alignContent: "center" }}>
    <div class="preloader-wrapper small active">
        <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>

        <div class="spinner-layer spinner-red">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>

        <div class="spinner-layer spinner-yellow">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>

        <div class="spinner-layer spinner-green">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>
</div>

// export const NotFound = () => 
//     return (
//         <Fragment>
//             <Header size="huge" inverted color="purple">
//                 Page Not Found lol
//              </Header>
//             <Image src="https://thumbs.dreamstime.com/z/senior-man-shrugging-his-shoulders-8775727.jpg" />
//         </Fragment>

//     )
// }
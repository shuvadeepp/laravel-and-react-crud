import HomeImg from '../images/DSC_0250.png';

export default function Home(){
    return(
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div class="col-md-12"> 
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <img src={HomeImg} classNameName="d-block mx-lg-auto img-fluid ms-n3" alt="HomeImg" width="500" height="500" loading="lazy" />
                        </div>
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Hey. I'm Shuvadeep</h1>
                            <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                {/* <button type="button" classNameName="btn btn-primary btn-lg px-4 me-md-2">Go</button> */}
                                {/* <button type="button" classNameName="btn btn-outline-secondary btn-lg px-4">Default</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 

        </>
    );
}
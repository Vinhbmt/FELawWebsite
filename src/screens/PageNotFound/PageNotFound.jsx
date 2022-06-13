import './PageNotFound.scss';

const PageNotFound = () => {

    return(
        <div className={"error-404-page"}>
            <h1 className="text-format-head" data-head="404">404</h1>
            <p className="text-format mt-2" data-p="This page could not be found">This page could not be found</p>
        </div>
    )
}

export default PageNotFound;
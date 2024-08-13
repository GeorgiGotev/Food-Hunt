import styles from "../Footer/Footer.module.css"

export default function Footer() {
    return (
        <div className={styles.footerDiv}>
            <div className="container-fluid bg-dark text-light has-height-md middle-items border-top text-center wow fadeIn">
                  <div className="row"> 
                    <div className="col-sm-4">
                        <h3>EMAIL US</h3>
                        <p className="text-muted">g.gotev@abv.bg</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>CALL US</h3>
                        <p className="text-muted">(+359) 878 45 44 88</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>FIND US</h3>
                        <p className="text-muted">
                            Bulgaria, Burgas
                        </p>
                    </div>
                </div> 
            </div>
            <footer className={styles.footerSection}>
            {/* <div className="bg-dark text-light text-center border-top wow fadeIn"> */}
                <p>
                    © Copyright by Georgi Gotev
                </p>
            {/* </div> */}
            </footer>
            </div>
    );
}

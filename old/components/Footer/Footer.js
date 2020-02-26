import React from "react";
import Witwa20Years from "../../images/WiTWA_20.png";

const Footer = ({ footerMenu, socialMenu, footerContent }) => (
	<footer className="bg-warning">
		<div className="container py-4">
			<div className="row mb-4">
				<div className="col-6 col-md-6 mb-4 mb-md-0 footer-columns">
					{footerMenu.items.map((item, index) => (
						<a
							className="d-block"
							key={item.wordpress_id}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{item.title}
						</a>
					))}
				</div>
				<div className="col-12 col-md-4 offset-md-2 d-flex justify-content-center justify-content-md-end align-items-center">
					{socialMenu.items.map(item => (
						<a
							className="mx-2"
							key={item.wordpress_id}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div
								className="icn icn-xl"
								dangerouslySetInnerHTML={{ __html: item.title }}
							/>
						</a>
					))}
				</div>
			</div>
			<div className="row pt-4">
				<div
					className="col-12 col-md-9 col-sm-8"
					dangerouslySetInnerHTML={{ __html: footerContent }}
				/>
				<div className="col-6 offset-3 col-md-3 col-sm-4 offset-md-0 offset-sm-0 text-right">
					<img
						src={Witwa20Years}
						role="presentation"
						className="twenty-years"
					/>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;

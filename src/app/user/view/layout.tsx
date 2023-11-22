import React from "react";

//Components
import PageWrapper from "@components/PageWrapper";

import Loading from "./loading";

export default function LayoutUserView({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PageWrapper hasMenu>
            <div className="mt-20 px-4 md:px-0">
                {children}
            </div>
        </PageWrapper>
    );
}

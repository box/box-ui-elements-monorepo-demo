"use client"; // This is necessary to ensure you are using the client-side version of React, box-ui-elements does not support SSR
import { useEffect, useRef, useState } from "react";

const importAnnotations = () =>
  import(/* webpackChunkName: "box-annotations" */ "box-annotations");

import dynamic from "next/dynamic";

// It is necessary to use dynamic, import the components from the es folder and setting SSR to false to avoid SSR issues
const ContentPreview = dynamic(
  () => import("box-ui-elements/es/elements/content-preview"),
  { ssr: false },
);

import constants from "shared"; // shared configuration or settings among demos
import ElementSection from "@/app/ElementSection";

export default function Annotations() {
  const defaultProps = {
    rootFolderId: constants.ROOTFOLDER_ID,
    token: constants.TOKEN,
  };

  const boxAnnotations = useRef(null);
  const [annotationsLoaded, setAnnotationsLoaded] = useState(false);

  useEffect(() => {
    importAnnotations().then(() => {
      boxAnnotations.current = new global.BoxAnnotations();
      setAnnotationsLoaded(true);
    });
  }, []);

  return (
    <>
      <h3>ContentPreview With Annotations</h3>
      <ElementSection>
        {annotationsLoaded && (
          <ContentPreview
            boxAnnotations={boxAnnotations.current}
            contentSidebarProps={{
              hasActivityFeed: true,
              features: {
                activityFeed: {
                  annotations: {
                    enabled: true,
                    hasAccessStats: true,
                    hasClassification: true,
                    hasNotices: true,
                    hasProperties: true,
                    hasRetentionPolicy: true,
                    hasVersions: true,
                  },
                },
              },
            }}
            hasHeader
            enableAnnotationsDiscoverability
            showAnnotations={annotationsLoaded}
            showAnnotationsControls
            showAnnotationsDrawing
            showAnnotationsDrawingCreate
            token={constants.TOKEN}
            fileId={constants.FILE_ID}
          />
        )}
      </ElementSection>
    </>
  );
}

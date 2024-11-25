"use client"; // This is necessary to ensure you are using the client-side version of React, box-ui-elements does not support SSR
import { useEffect, useRef, useState } from "react";

const importAnnotations = () =>
  import(/* webpackChunkName: "box-annotations" */ "box-annotations");

import dynamic from "next/dynamic";

// It is necessary to use dynamic, import the components from the es folder and setting SSR to false to avoid SSR issues
const ContentExplorer = dynamic(
  () => import("box-ui-elements/es/elements/content-explorer"),
  { ssr: false },
);
const ContentPicker = dynamic(
  () => import("box-ui-elements/es/elements/content-picker"),
  { ssr: false },
);
const ContentPreview = dynamic(
  () => import("box-ui-elements/es/elements/content-preview"),
  { ssr: false },
);
const ContentSidebar = dynamic(
  () => import("box-ui-elements/es/elements/content-sidebar"),
  { ssr: false },
);
const ContentSharing = dynamic(
  () => import("box-ui-elements/es/elements/content-sharing"),
  { ssr: false },
);
const ContentUploader = dynamic(
  () => import("box-ui-elements/es/elements/content-uploader"),
  { ssr: false },
);

import constants from "shared"; // shared configuration or settings among demos
import ElementSection from "@/app/ElementSection";

export default function Home() {
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
      <h3>ContentExplorer</h3>
      <ElementSection>
        {annotationsLoaded && (
          <ContentExplorer
            {...defaultProps}
            contentPreviewProps={{
              boxAnnotations: boxAnnotations.current,
              contentSidebarProps: {
                hasActivityFeed: true,
                features: {
                  activityFeed: {
                    annotations: {
                      enabled: true,
                    },
                  },
                },
              },
              hasHeader: true,
              enableAnnotationsDiscoverability: true,
              showAnnotations: { annotationsLoaded },
              showAnnotationsControls: true,
              showAnnotationsDrawing: true,
              showAnnotationsDrawingCreate: true,
              token: constants.TOKEN,
              fileId: constants.FILE_ID,
            }}
          />
        )}
      </ElementSection>
      <h3>ContentPicker</h3>
      <ElementSection>
        <ContentPicker {...defaultProps} />
      </ElementSection>

      <h3>ContentPreview</h3>
      <ElementSection>
        <ContentPreview token={constants.TOKEN} fileId={constants.FILE_ID} />
      </ElementSection>

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

      <h3>ContentSidebar</h3>
      <ElementSection>
        <ContentSidebar
          token={constants.TOKEN}
          fileId={constants.FILE_ID}
          detailsSidebarProps={{
            hasProperties: true,
            hasNotices: true,
            hasAccessStats: true,
            hasClassification: true,
            hasRetentionPolicy: true,
          }}
          features={constants.FEATURE_FLAGS}
          hasActivityFeed
          hasMetadata
          hasSkills
          hasVersions
        />
      </ElementSection>
      <h3>ContentSharing</h3>
      <ElementSection>
        <ContentSharing
          {...defaultProps}
          displayInModal={false}
          itemID={constants.FILE_ID}
          itemType="file"
          config={{
            showEmailSharedLinkForm: false,
            showInviteCollaboratorMessageSection: false,
          }}
        />
      </ElementSection>
      <h3>ContentUploader</h3>
      <ElementSection>
        <ContentUploader {...defaultProps} isFolderUploadEnabled />
      </ElementSection>
    </>
  );
}

'use client' // This is necessary to ensure you are using the client-side version of React, box-ui-elements does not support SSR
import dynamic from 'next/dynamic';
import { IntlProvider } from "react-intl";

// It is necessary to use dynamic, import the components from the es folder and setting SSR to false to avoid SSR issues
const ContentExplorer = dynamic(() => import("box-ui-elements/es/elements/content-explorer"), { ssr: false });
const ContentPicker = dynamic(() => import("box-ui-elements/es/elements/content-picker"), { ssr: false });
const ContentPreview = dynamic(() => import("box-ui-elements/es/elements/content-preview"), { ssr: false });
const ContentSidebar = dynamic(() => import("box-ui-elements/es/elements/content-sidebar"), { ssr: false });
const ContentSharing = dynamic(() => import("box-ui-elements/es/elements/content-sharing"), { ssr: false });
const ContentUploader = dynamic(() => import("box-ui-elements/es/elements/content-uploader"), { ssr: false });

import styles from "./page.module.css";

import constants from "shared"; // shared configuration or settings among demos
import ElementSection from "@/app/ElementSection";


export default function Home() {
  const defaultProps = {
    rootFolderId: constants.ROOTFOLDER_ID,
    token: constants.TOKEN,
  };

// IntlProvider is necessary to provide the correct locale for the components
// locale and messages are required, you can use the messages from box-ui-elements or create your own
// by default all messages are in english, changing locale does not change the messages alone

  return (
      <IntlProvider locale="en">
          <main className={styles.main}>
              <h3>ContentExplorer</h3>
              <ElementSection>
                  <ContentExplorer {...defaultProps} />
              </ElementSection>
              <h3>ContentPicker</h3>
              <ElementSection>
                  <ContentPicker {...defaultProps} />
              </ElementSection>
              <h3>ContentPreview</h3>
              <ElementSection>
                  <ContentPreview
                      token={constants.TOKEN}
                      fileId={constants.FILE_ID}
                      hasHeader
                      contentAnswersProps={{
                          show: true,
                      }}
                  />
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
                  <ContentUploader {...defaultProps} isFolderUploadEnabled/>
              </ElementSection>
          </main>
      </IntlProvider>
  );
}

import { IntlProvider } from "react-intl";

import ContentExplorer from "box-ui-elements/es/elements/content-explorer";
import ContentPicker from "box-ui-elements/es/elements/content-picker";
import ContentPreview from "box-ui-elements/es/elements/content-preview";
import ContentSidebar from "box-ui-elements/es/elements/content-sidebar";
import ContentSharing from "box-ui-elements/es/elements/content-sharing";
import ContentUploader from "box-ui-elements/es/elements/content-uploader";

import constants from "shared";
import ElementSection from "./ElementSection";

import "./App.css";

function App() {
  const defaultProps = {
    rootFolderId: constants.ROOTFOLDER_ID,
    token: constants.TOKEN,
  };

  // IntlProvider is necessary to provide the correct locale for the components
  // locale and messages are required, you can use the messages from box-ui-elements or create your own
  // by default all messages are in english, changing locale does not change the messages alone

  return (
    <IntlProvider locale="en">
      <main>
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
          <ContentUploader {...defaultProps} isFolderUploadEnabled />
        </ElementSection>
      </main>
    </IntlProvider>
  );
}

export default App;

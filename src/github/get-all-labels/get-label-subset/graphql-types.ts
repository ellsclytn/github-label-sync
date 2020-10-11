import { Maybe, LabelFieldsFragment } from '../../../generated/graphql'

/** Return type of getLabels query. Manually created as a dynamic set
 *  of queries is a little bit too much for the GraphQL Code generator to
 *  handle on its own.
 */
export type GetLabelSubsetsQuery = { readonly __typename?: 'Query' } & {
  readonly [name: string]: Maybe<
  | { readonly __typename: 'AddedToProjectEvent' }
  | { readonly __typename: 'App' }
  | { readonly __typename: 'AssignedEvent' }
  | { readonly __typename: 'AutomaticBaseChangeFailedEvent' }
  | { readonly __typename: 'AutomaticBaseChangeSucceededEvent' }
  | { readonly __typename: 'BaseRefChangedEvent' }
  | { readonly __typename: 'BaseRefDeletedEvent' }
  | { readonly __typename: 'BaseRefForcePushedEvent' }
  | { readonly __typename: 'Blob' }
  | { readonly __typename: 'Bot' }
  | { readonly __typename: 'BranchProtectionRule' }
  | { readonly __typename: 'CheckRun' }
  | { readonly __typename: 'CheckSuite' }
  | { readonly __typename: 'ClosedEvent' }
  | { readonly __typename: 'CodeOfConduct' }
  | { readonly __typename: 'CommentDeletedEvent' }
  | { readonly __typename: 'Commit' }
  | { readonly __typename: 'CommitComment' }
  | { readonly __typename: 'CommitCommentThread' }
  | { readonly __typename: 'ConnectedEvent' }
  | { readonly __typename: 'ConvertToDraftEvent' }
  | { readonly __typename: 'ConvertedNoteToIssueEvent' }
  | { readonly __typename: 'CrossReferencedEvent' }
  | { readonly __typename: 'DemilestonedEvent' }
  | { readonly __typename: 'DeployKey' }
  | { readonly __typename: 'DeployedEvent' }
  | { readonly __typename: 'Deployment' }
  | { readonly __typename: 'DeploymentEnvironmentChangedEvent' }
  | { readonly __typename: 'DeploymentStatus' }
  | { readonly __typename: 'DisconnectedEvent' }
  | { readonly __typename: 'Enterprise' }
  | { readonly __typename: 'EnterpriseAdministratorInvitation' }
  | { readonly __typename: 'EnterpriseIdentityProvider' }
  | { readonly __typename: 'EnterpriseRepositoryInfo' }
  | { readonly __typename: 'EnterpriseServerInstallation' }
  | { readonly __typename: 'EnterpriseServerUserAccount' }
  | { readonly __typename: 'EnterpriseServerUserAccountEmail' }
  | { readonly __typename: 'EnterpriseServerUserAccountsUpload' }
  | { readonly __typename: 'EnterpriseUserAccount' }
  | { readonly __typename: 'ExternalIdentity' }
  | { readonly __typename: 'Gist' }
  | { readonly __typename: 'GistComment' }
  | { readonly __typename: 'HeadRefDeletedEvent' }
  | { readonly __typename: 'HeadRefForcePushedEvent' }
  | { readonly __typename: 'HeadRefRestoredEvent' }
  | { readonly __typename: 'IpAllowListEntry' }
  | { readonly __typename: 'Issue' }
  | { readonly __typename: 'IssueComment' }
  | { readonly __typename: 'Label' }
  | { readonly __typename: 'LabeledEvent' }
  | { readonly __typename: 'Language' }
  | { readonly __typename: 'License' }
  | { readonly __typename: 'LockedEvent' }
  | { readonly __typename: 'Mannequin' }
  | { readonly __typename: 'MarkedAsDuplicateEvent' }
  | { readonly __typename: 'MarketplaceCategory' }
  | { readonly __typename: 'MarketplaceListing' }
  | { readonly __typename: 'MembersCanDeleteReposClearAuditEntry' }
  | { readonly __typename: 'MembersCanDeleteReposDisableAuditEntry' }
  | { readonly __typename: 'MembersCanDeleteReposEnableAuditEntry' }
  | { readonly __typename: 'MentionedEvent' }
  | { readonly __typename: 'MergedEvent' }
  | { readonly __typename: 'Milestone' }
  | { readonly __typename: 'MilestonedEvent' }
  | { readonly __typename: 'MovedColumnsInProjectEvent' }
  | { readonly __typename: 'OauthApplicationCreateAuditEntry' }
  | { readonly __typename: 'OrgAddBillingManagerAuditEntry' }
  | { readonly __typename: 'OrgAddMemberAuditEntry' }
  | { readonly __typename: 'OrgBlockUserAuditEntry' }
  | { readonly __typename: 'OrgConfigDisableCollaboratorsOnlyAuditEntry' }
  | { readonly __typename: 'OrgConfigEnableCollaboratorsOnlyAuditEntry' }
  | { readonly __typename: 'OrgCreateAuditEntry' }
  | { readonly __typename: 'OrgDisableOauthAppRestrictionsAuditEntry' }
  | { readonly __typename: 'OrgDisableSamlAuditEntry' }
  | { readonly __typename: 'OrgDisableTwoFactorRequirementAuditEntry' }
  | { readonly __typename: 'OrgEnableOauthAppRestrictionsAuditEntry' }
  | { readonly __typename: 'OrgEnableSamlAuditEntry' }
  | { readonly __typename: 'OrgEnableTwoFactorRequirementAuditEntry' }
  | { readonly __typename: 'OrgInviteMemberAuditEntry' }
  | { readonly __typename: 'OrgInviteToBusinessAuditEntry' }
  | { readonly __typename: 'OrgOauthAppAccessApprovedAuditEntry' }
  | { readonly __typename: 'OrgOauthAppAccessDeniedAuditEntry' }
  | { readonly __typename: 'OrgOauthAppAccessRequestedAuditEntry' }
  | { readonly __typename: 'OrgRemoveBillingManagerAuditEntry' }
  | { readonly __typename: 'OrgRemoveMemberAuditEntry' }
  | { readonly __typename: 'OrgRemoveOutsideCollaboratorAuditEntry' }
  | { readonly __typename: 'OrgRestoreMemberAuditEntry' }
  | { readonly __typename: 'OrgUnblockUserAuditEntry' }
  | { readonly __typename: 'OrgUpdateDefaultRepositoryPermissionAuditEntry' }
  | { readonly __typename: 'OrgUpdateMemberAuditEntry' }
  | {
    readonly __typename: 'OrgUpdateMemberRepositoryCreationPermissionAuditEntry'
  }
  | {
    readonly __typename: 'OrgUpdateMemberRepositoryInvitationPermissionAuditEntry'
  }
  | { readonly __typename: 'Organization' }
  | { readonly __typename: 'OrganizationIdentityProvider' }
  | { readonly __typename: 'OrganizationInvitation' }
  | { readonly __typename: 'Package' }
  | { readonly __typename: 'PackageFile' }
  | { readonly __typename: 'PackageTag' }
  | { readonly __typename: 'PackageVersion' }
  | { readonly __typename: 'PinnedEvent' }
  | { readonly __typename: 'PrivateRepositoryForkingDisableAuditEntry' }
  | { readonly __typename: 'PrivateRepositoryForkingEnableAuditEntry' }
  | { readonly __typename: 'Project' }
  | { readonly __typename: 'ProjectCard' }
  | { readonly __typename: 'ProjectColumn' }
  | { readonly __typename: 'PublicKey' }
  | { readonly __typename: 'PullRequest' }
  | { readonly __typename: 'PullRequestCommit' }
  | { readonly __typename: 'PullRequestCommitCommentThread' }
  | { readonly __typename: 'PullRequestReview' }
  | { readonly __typename: 'PullRequestReviewComment' }
  | { readonly __typename: 'PullRequestReviewThread' }
  | { readonly __typename: 'Push' }
  | { readonly __typename: 'PushAllowance' }
  | { readonly __typename: 'Reaction' }
  | { readonly __typename: 'ReadyForReviewEvent' }
  | { readonly __typename: 'Ref' }
  | { readonly __typename: 'ReferencedEvent' }
  | { readonly __typename: 'Release' }
  | { readonly __typename: 'ReleaseAsset' }
  | { readonly __typename: 'RemovedFromProjectEvent' }
  | { readonly __typename: 'RenamedTitleEvent' }
  | { readonly __typename: 'ReopenedEvent' }
  | { readonly __typename: 'RepoAccessAuditEntry' }
  | { readonly __typename: 'RepoAddMemberAuditEntry' }
  | { readonly __typename: 'RepoAddTopicAuditEntry' }
  | { readonly __typename: 'RepoArchivedAuditEntry' }
  | { readonly __typename: 'RepoChangeMergeSettingAuditEntry' }
  | { readonly __typename: 'RepoConfigDisableAnonymousGitAccessAuditEntry' }
  | { readonly __typename: 'RepoConfigDisableCollaboratorsOnlyAuditEntry' }
  | { readonly __typename: 'RepoConfigDisableContributorsOnlyAuditEntry' }
  | { readonly __typename: 'RepoConfigDisableSockpuppetDisallowedAuditEntry' }
  | { readonly __typename: 'RepoConfigEnableAnonymousGitAccessAuditEntry' }
  | { readonly __typename: 'RepoConfigEnableCollaboratorsOnlyAuditEntry' }
  | { readonly __typename: 'RepoConfigEnableContributorsOnlyAuditEntry' }
  | { readonly __typename: 'RepoConfigEnableSockpuppetDisallowedAuditEntry' }
  | { readonly __typename: 'RepoConfigLockAnonymousGitAccessAuditEntry' }
  | { readonly __typename: 'RepoConfigUnlockAnonymousGitAccessAuditEntry' }
  | { readonly __typename: 'RepoCreateAuditEntry' }
  | { readonly __typename: 'RepoDestroyAuditEntry' }
  | { readonly __typename: 'RepoRemoveMemberAuditEntry' }
  | { readonly __typename: 'RepoRemoveTopicAuditEntry' }
  | ({ readonly __typename: 'Repository' } & {
    readonly labels: Maybe<
    { readonly __typename?: 'LabelConnection' } & LabelFieldsFragment
    >
  })
  | { readonly __typename: 'RepositoryInvitation' }
  | { readonly __typename: 'RepositoryTopic' }
  | { readonly __typename: 'RepositoryVisibilityChangeDisableAuditEntry' }
  | { readonly __typename: 'RepositoryVisibilityChangeEnableAuditEntry' }
  | { readonly __typename: 'RepositoryVulnerabilityAlert' }
  | { readonly __typename: 'ReviewDismissalAllowance' }
  | { readonly __typename: 'ReviewDismissedEvent' }
  | { readonly __typename: 'ReviewRequest' }
  | { readonly __typename: 'ReviewRequestRemovedEvent' }
  | { readonly __typename: 'ReviewRequestedEvent' }
  | { readonly __typename: 'SavedReply' }
  | { readonly __typename: 'SecurityAdvisory' }
  | { readonly __typename: 'SponsorsListing' }
  | { readonly __typename: 'SponsorsTier' }
  | { readonly __typename: 'Sponsorship' }
  | { readonly __typename: 'Status' }
  | { readonly __typename: 'StatusCheckRollup' }
  | { readonly __typename: 'StatusContext' }
  | { readonly __typename: 'SubscribedEvent' }
  | { readonly __typename: 'Tag' }
  | { readonly __typename: 'Team' }
  | { readonly __typename: 'TeamAddMemberAuditEntry' }
  | { readonly __typename: 'TeamAddRepositoryAuditEntry' }
  | { readonly __typename: 'TeamChangeParentTeamAuditEntry' }
  | { readonly __typename: 'TeamDiscussion' }
  | { readonly __typename: 'TeamDiscussionComment' }
  | { readonly __typename: 'TeamRemoveMemberAuditEntry' }
  | { readonly __typename: 'TeamRemoveRepositoryAuditEntry' }
  | { readonly __typename: 'Topic' }
  | { readonly __typename: 'TransferredEvent' }
  | { readonly __typename: 'Tree' }
  | { readonly __typename: 'UnassignedEvent' }
  | { readonly __typename: 'UnlabeledEvent' }
  | { readonly __typename: 'UnlockedEvent' }
  | { readonly __typename: 'UnmarkedAsDuplicateEvent' }
  | { readonly __typename: 'UnpinnedEvent' }
  | { readonly __typename: 'UnsubscribedEvent' }
  | { readonly __typename: 'User' }
  | { readonly __typename: 'UserBlockedEvent' }
  | { readonly __typename: 'UserContentEdit' }
  | { readonly __typename: 'UserStatus' }
  >
};

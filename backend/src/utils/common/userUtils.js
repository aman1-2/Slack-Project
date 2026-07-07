export const isUserMemberOfWorkspace = (workspace, userId) => {
    return workspace.members.find(
        (member) => member.memberId.toString() === userId
    );
}; 
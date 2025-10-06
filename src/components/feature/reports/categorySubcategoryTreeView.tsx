import * as React from "react";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import LinearProgressWithLabel from "@/components/common/linearProgressWithlabel";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.grey[200],
    [`& .${treeItemClasses.content}`]: {
        borderRadius: theme.spacing(0.1),
        padding: theme.spacing(0.5, 1),
        margin: theme.spacing(0.2, 0),
        [`& .${treeItemClasses.label}`]: {
            fontSize: "0.8rem",
            fontWeight: 500,
        },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(0, 1.2),
        ...theme.applyStyles("light", {
            backgroundColor: alpha(theme.palette.primary.main, 0.25),
        }),
        ...theme.applyStyles("dark", {
            color: theme.palette.primary.contrastText,
        }),
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    ...theme.applyStyles("light", {
        color: theme.palette.grey[800],
    }),
}));

// Helper: Custom Label with Progress
function LabelWithProgress({ text, progress }: { text: string; progress: number }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, width: "100%" }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {text}
            </Typography>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}

export default function CategorySubCategoryTreeView({ data }: { data: any[] }) {
    return (
        <Box sx={{ minHeight: 352, minWidth: 280 }}>
            <SimpleTreeView defaultExpandedItems={["grid"]}>
                {
                    data.map((item: any) =>
                        <Box key={item.id}>
                            <CustomTreeItem itemId={item.id} label={<LabelWithProgress text={`${item.name} - (${item.amount})`} progress={item.percentage} />}>
                                {
                                    item.subCategories.map((subCat: any) =>
                                        <Box key={subCat.id}>
                                            <CustomTreeItem itemId={subCat.id} label={<LabelWithProgress text={`${subCat.name} - (${subCat.amount})`} progress={subCat.percentage} />} />
                                        </Box>)
                                }
                            </CustomTreeItem>
                        </Box>)
                }
            </SimpleTreeView>
        </Box>
    );
}

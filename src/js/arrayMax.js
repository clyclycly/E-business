export default function (arr) {
    return Math.max.apply(Math, arr); // 即Math.max(arr[1],arr[2]...),this都是math
}